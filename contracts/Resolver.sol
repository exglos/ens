// SPDX-License-Identifier: Unlicense
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.4;

/**
 * @title Resolver
 * @author exglos.eth
 * @notice A basic interface for ENS resolver
 */
contract Resolver {
  function supportsInterface(bytes4 intefaceId) public pure returns(bool);
  function addr(bytes node) public view returns (address);
  function setAddr(bytes32 node, addr address) public;
}