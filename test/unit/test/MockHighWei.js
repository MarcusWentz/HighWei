const { expect } = require("chai");
const { ethers } = require("hardhat");
provider = ethers.provider;

describe("contract HighWei tests:", function () {

      let HighWei;
      let HighWeiDeployed;
      let owner;
      let addr1;
      let addr2;
      let addrs;

      beforeEach(async function () {
        HighWei = await ethers.getContractFactory("HighWei");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        HighWeiDeployed = await HighWei.deploy();
      });

      describe("constructor()", function () {
        it("tollPennies == 0", async function () {
          expect(await HighWeiDeployed.tollPennies()).to.equal(0);
        });
        it("timeOpened == 0", async function () {
          expect(await HighWeiDeployed.timeOpened()).to.equal(0);
        });
        it("Owner is equal to default ethers.getSigners() address.", async function () {
              expect(await HighWeiDeployed.Owner()).to.equal(owner.address);
        });
        it("servoState == 0", async function () {
          expect(await HighWeiDeployed.servoState()).to.equal(0);
        });
       });

      describe("openServoGate()", function () {
        it("Fail tx if msg.value = 0.", async function () {
          await expect(HighWeiDeployed.connect(addr2).openServoGate({ value: ethers.utils.parseEther( ('0') )  })).to.be.reverted
        });
        it("Send 2.1 MATIC to open gate and turn time check on with contract balance 0 after transfer to Owner.", async function () {
          await HighWeiDeployed.uintAdapterCall()
          expect(await HighWeiDeployed.tollPennies()).to.equal(300);
          await HighWeiDeployed.connect(addr2).openServoGate({ value: ethers.utils.parseEther( ('2.1') )  })
          expect(await HighWeiDeployed.servoState()).to.equal(1);
          const timestamp = (await provider.getBlock(0)).timestamp;
          expect(await HighWeiDeployed.timeOpened()).to.equal(timestamp+9);
          expect(await provider.getBalance(HighWeiDeployed.address)).to.equal(0);
        });
        it("Fail if already open.", async function () {
          await HighWeiDeployed.uintAdapterCall()
          expect(await HighWeiDeployed.tollPennies()).to.equal(300);
          await HighWeiDeployed.connect(addr2).openServoGate({ value: ethers.utils.parseEther( ('2.1') )  })
          await expect(HighWeiDeployed.connect(addr2).openServoGate({ value: ethers.utils.parseEther( ('2.1') )  })).to.be.revertedWith('ALREADY_OPEN.');
        });
      });

      describe("closeServoGate()", function () {
          it("Fail tx if Owner address is not used for tx.", async function () {
            await expect(HighWeiDeployed.connect(addr2).closeServoGate()).to.be.revertedWith('ONLY_OWNER_FUNCTION.');
          });
          it("Fail tx if servo already closed.", async function () {
            await expect(HighWeiDeployed.closeServoGate()).to.be.revertedWith('ALREADY_CLOSED.');
          });
          it("Pass if owner and servo open.", async function () {
            await HighWeiDeployed.uintAdapterCall()
            expect(await HighWeiDeployed.tollPennies()).to.equal(300);
            await HighWeiDeployed.connect(addr2).openServoGate({ value: ethers.utils.parseEther( ('2.1') )  })
            await expect(HighWeiDeployed.closeServoGate())
            expect(await HighWeiDeployed.servoState()).to.equal(0);
            expect(await HighWeiDeployed.timeOpened()).to.equal(0);
          });
      });

      describe("uintAdapterCall()", function () {
        it("Sets tollPennies to 300.", async function () {
          await HighWeiDeployed.uintAdapterCall()
          expect(await HighWeiDeployed.tollPennies()).to.equal(300);
        });
      });

      describe("oneBlockPassedSinceOpened().", function () {
         it("False on deployment.", async function () {
           expect( (await HighWeiDeployed.oneBlockPassedSinceOpened()).toString() ).to.equal('false');
         });
       });

});
