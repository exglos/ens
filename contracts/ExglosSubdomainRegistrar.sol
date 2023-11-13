// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

pragma solidity ^0.8.0;

import "@ensdomains/ens-contracts/contracts/registry/ENS.sol";
import "@ensdomains/ens-contracts/contracts/resolvers/Resolver.sol";

/**
 * @title
 * @author naftalimurgor
 * @notice this contract should own the exglos.eth as a contract account domain and issue subdomains to other EOA addresses
 */

contract SubdomainRegistrar {
    ENS public ens;
    Resolver public resolver;
    address payable public owner;

    constructor(address ensAddress, address resolverAddress) {
        ens = ENS(ensAddress);
        resolver = Resolver(resolverAddress);
        owner = payable(msg.sender);
    }

    receive() external payable {}

    fallback() external payable {}

    function claim(
        string calldata subdomain,
        address payable newOwner
    ) external payable {
        uint subdomainLength = _getLength(subdomain);
        if (subdomainLength == 2) {
            claimSubdomainTwoLabels(subdomain, newOwner);
        } else if (subdomainLength == 3) {
            claimSubdomainThreeLabels(subdomain, newOwner);
        } else if (subdomainLength == 4) {
            claimSubdomainFourLabels(subdomain, newOwner);
        } else if (subdomainLength == 5) {
            claimSubdomainFiveLabels(subdomain, newOwner);
        } else if (subdomainLength >= 6) {
            claimSubdomainSixOrMoreLabels(subdomain, newOwner);
        }
    }

    function _claimSubdomain(
        string calldata subdomain,
        address payable newOwner
    ) internal {
        // Calculate the ENS root node
        bytes32 rootNode = bytes32(uint(0));

        // Check if the subdomain is available
        bytes32 label = keccak256(bytes(subdomain));
        bytes32 node = keccak256(abi.encodePacked(rootNode, label));
        address currentOwner = ens.owner(node);
        require(currentOwner == address(0), "Subdomain already owned");

        // charge some ether
        // Create the subdomain and set its resolver
        ens.setSubnodeRecord(
            rootNode,
            label,
            address(this),
            address(resolver),
            0
        );

        // Transfer ownership to the new owner
        resolver.setAddr(node, newOwner);
    }

    function claimSubdomainTwoLabels(
        string calldata _subdomain,
        address payable _newOwner
    ) public payable {
        require(
            msg.value > 1 ether,
            "Insufficient balance to purchase domain of 2 bytes"
        );
        _claimSubdomain(_subdomain, _newOwner);
    }

    function claimSubdomainThreeLabels(
        string calldata _subdomain,
        address payable _newOwner
    ) public payable {
        require(
            msg.value > 0.1 ether,
            "Insufficient balance to purchase domain of 3 bytes"
        );
        _claimSubdomain(_subdomain, _newOwner);
    }

    function claimSubdomainFourLabels(
        string calldata _subdomain,
        address payable _newOwner
    ) public payable {
        require(
            msg.value > 0.01 ether,
            "Insufficient balance to purchase domain of 4 bytes"
        );
        _claimSubdomain(_subdomain, _newOwner);
    }

    function claimSubdomainFiveLabels(
        string calldata _subdomain,
        address payable _newOwner
    ) public payable {
        require(msg.value > 0.001 ether, "Insufficient balance");
        _claimSubdomain(_subdomain, _newOwner);
    }

    function claimSubdomainSixOrMoreLabels(
        string calldata _subdomain,
        address payable _newOwner
    ) public payable {
        // FREE! only gas fees deducted
        _claimSubdomain(_subdomain, _newOwner);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function _getLength(string memory s) public pure returns (uint256) {
        bytes memory b = bytes(s);
        return b.length;
    }
}
