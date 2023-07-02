pragma solidity >=0.8.4;
import "github.com/Arachnid/solidity-stringutils/strings.sol";
import "./ENS.sol";

/**
 * A registrar that allocates subdomains.
 */
contract ExglosSubdomainRegistrar {
    ENS ens;
    bytes32 rootNode;

    modifier onlyOwner(bytes32 label) {
        address currentOwner = ens.owner(
            keccak256(abi.encodePacked(rootNode, label))
        );
        require(currentOwner == address(0x0) || currentOwner == msg.sender);
        _;
    }

    /**
     * Constructor.
     * @param ensAddr The address of the ENS registry.
     * @param node The node that this registrar administers.
     */
    constructor(ENS ensAddr, bytes32 node) public {
        ens = ensAddr;
        rootNode = node;
    }

    /**
     * Register a name, or change the owner of an existing registration.
     * @param label The hash of the label to register.
     * @param owner The address of the new owner.
     */
    function _register(bytes32 label, address owner) public onlyOwner(label) {
        ens.setSubnodeOwner(rootNode, label, owner);
    }

    // calculate price
    // register
    // namehashing using Javasscript libraries

    function calcuatePrice(
        string memory subdomain
    ) public returns (uint256 price, uint length) {
        // string manipulation
        // length, return price
        // store price inside constants
    }

    function setupExglosSubdomain() public returns (address, bytes32, bool) {
        // charge price
        // register subdomain
        // return s
    }
}
