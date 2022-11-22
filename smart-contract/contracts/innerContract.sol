// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InnerContract is Ownable {
    // userAddress => tokenAddress => numberOfTokens
    mapping(address => mapping(address => uint256) ) public balances;

    // userAddress => tokenAddress => to
    mapping(address => mapping(address => address) ) public toAddrBalances;

    function depositTokens(address _from, address _erc20Addr, uint256 _numberOfTokens, address _to) external onlyOwner {
        balances[_from][_erc20Addr] = _numberOfTokens;
        toAddrBalances[_from][_erc20Addr] = _to;
    }

    function withdraw(address _from, address _erc20Addr, uint256 _numberOfTokens, address _to) external onlyOwner {
        require( balances[_from][_erc20Addr] == _numberOfTokens );
        require( toAddrBalances[_from][_erc20Addr] == _to );
        ERC20(_erc20Addr).transfer(_to, _numberOfTokens);
    }
}