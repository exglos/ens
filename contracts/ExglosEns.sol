// SPDX-License-Identifier: exglos

pragma solidity 0.8.26;

interface ENS {
    function setSubnodeRecord(bytes32 _node, bytes32 _label, address _owner, address _resolver, uint64 _ttl) external;
    function resolver(bytes32 _node) external view returns (address);
}
interface ReverseRegistrar {
    function node(address _address) external pure returns (bytes32);
}
interface AddrResolver {
    function addr(bytes32 _node) external view returns (address payable);
}
interface NameResolver {
    function name(bytes32 _node) external view returns (string memory);
}

contract ExglosEns is AddrResolver, NameResolver {
    ENS public constant ens = ENS(0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e);
    address public constant reverseRegistrar = 0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb;
    address payable public exglos;
    bytes32 public constant exglosNode = 0x7636824449d51d8a40741886952e3c504b6286994b89f099545f9af9aec49483;
    mapping(bytes32 => address payable) public addr;
    mapping(bytes32 => string) public name;

    event AddrChanged(bytes32 indexed _node, address _address);

    constructor() {
        exglos = payable(msg.sender);
    }

    function supportsInterface(bytes4 _id) external pure returns (bool) {
        if (_id == 0x01FFC9A7 || _id == 0x3B3B57DE || _id == 0x691F3431) {
            return true; // supportsInterface, addr, name
        }
        return false;
    }

    function buy(string calldata _exglosEthName) external payable {
        require(msg.value >= 1000000 gwei, "small value");
        bytes32 label = keccak256(bytes(_exglosEthName));
        bytes32 node = keccak256(abi.encodePacked(exglosNode, label));
        require(addr[node] == address(0), "already exists");
        addr[node] = payable(msg.sender);
        emit AddrChanged(node, msg.sender);
        ens.setSubnodeRecord(exglosNode, label, msg.sender, address(this), 0);
        exglos.transfer(address(this).balance);
    }

    // call reverseRegistrar.setNameForAddr(sender, sender, this, name.exglos.eth);
    function setName(bytes32 _node, string calldata _name) external {
        require(msg.sender == reverseRegistrar, "not a registrar");
        name[_node] = _name;
    }

    function getAddress(string calldata _exglosEthName) external view returns (address payable) {
        bytes32 node = keccak256(abi.encodePacked(exglosNode, keccak256(bytes(_exglosEthName))));
        address resolver = ens.resolver(node);
        require(resolver != address(0), "not registered");
        return AddrResolver(resolver).addr(node);
    }

    function getName(address _address) external view returns (string memory) {
        bytes32 node = ReverseRegistrar(reverseRegistrar).node(_address);
        address resolver = ens.resolver(node);
        require(resolver != address(0), "not registered");
        return NameResolver(resolver).name(node);
    }
}