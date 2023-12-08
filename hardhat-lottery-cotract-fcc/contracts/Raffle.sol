//Raffle

//Enter the lottery (paying some amount)
//Pick a random winner (verifiably random)
//Winner to be selected every X minutes -> completly automate
//Chainlink Oracle -> Randomness, Automated Execution (ChianLink Keeper)

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

error Raffle__NotEnoughETHEntered();

contract Raffle {

    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable{
        //require msg.value > i_entranceFee

        if(msg.value < i_entranceFee){
            revert Raffle__NotEnoughETHEntered();
        }
        s_players.push(payable(msg.sender));

        //Events
    }

    // function pickRandomWInner() {}

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns(address) {
        return s_players[index];
    }

}