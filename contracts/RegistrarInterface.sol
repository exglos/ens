// SPDX-License-Identifier: Unlicense
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.4;

interface RegistrarInterface {
  event DomainOwnerChanged(bytes32 indexed, address indexed oldDomainOwner, address indexed newDomainOwner);
  event DomainConfigured(bytes32 indexed label);
  event DomainUnlisted(bytes32 indexed label);
  event NewDomainRegistration(bytes32 indexed label, string subdomain, address indexed owner, address indexed referrer, uint price);
  event DomainRentPaid(bytes32 indexed label, string subdomain, uint amount, uint expirationDate);

  // interfaceID of these 4 method is 0xc1b15f5a
  function query(bytes32 label, string calldata subdomain) external view returns (string memory domain, uint signupFee, uint rent, uint referralPPM);
  function register(bytes32 label, string calldata subdomain, address owner, address payable referrer);
  
  function rentDue(bytes32 label, string calldata subdomain) external view returns (uint timestamp);
  function payRent(bytes32 label, string calldata subdomain) external payable;
}