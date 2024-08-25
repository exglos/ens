# abstract

Recognizing that most people simply need just a name,
exglos provides a straightforward solution that eliminates the complexities and high costs
typically associated with traditional ens purchases.

## design

Exglos utilizes a single contract design to enhance readability and direct usage,
with a strong emphasis on low gas consumption.
By eliminating nft, wrappers, versioning, and complicated resolvers,
the contract remains simple and efficient, reducing complexity and transaction costs.
By avoiding third parties, except for ethers.js,
exglos facilitates easy evolution and clean maintenance of the system.

## bugs

The reverse name registered by the built-in reverse resolver is not visible as a label on etherscan
because of the lack of emitted events,
so we are currently using the default reverse resolver to ensure proper functionality.

# roadmap

Improve functionality based on real user experiences.