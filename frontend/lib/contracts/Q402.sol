// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Q402
 * @dev ERC20 Token Contract for Q402
 * @notice This contract implements a standard ERC20 token with minting and burning capabilities
 */
contract Q402 is ERC20, ERC20Burnable, Ownable {
    /**
     * @dev Constructor that mints initial supply to the deployer
     * @param initialSupply The initial supply of tokens to mint
     */
    constructor(uint256 initialSupply) ERC20("Q402", "Q402") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /**
     * @dev Mint new tokens to a specified address
     * @param to The address to mint tokens to
     * @param amount The amount of tokens to mint
     * @notice Only the owner can mint new tokens
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Override decimals to return 18 (standard ERC20)
     * @return The number of decimals for the token
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
