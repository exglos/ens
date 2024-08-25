(function () {
    'use strict';

    var ready, provider;
    var exglosEnsAddress = '0x043D14Ef6fEFA3aC8Dd40519303778ed1ad6F56F';
    var exglosEnsAbi = ['function buy(string) payable'];
    var reverseRegistrarAddress = '0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb';
    var reverseRegistrarAbi = ['function setName(string)'];

    window.onload = function () {
        document.getElementById('buy').onclick = function () {
            checkInput(buy);
        };
        document.getElementById('register').onclick = function () {
            checkInput(register);
        };
        load();
    };

    function load() {
        if (!window.ethereum) {
            document.getElementById('message').innerHTML = 'Don\'t have web3? Try ' +
                '<a target="_blank" href="https://wallet.exglos.com">wallet.exglos.com</a>!';
            return;
        }
        provider = new ethers.providers.Web3Provider(ethereum);
        provider.getNetwork().then(function (network) {
            if (network.chainId !== 1) {
                document.getElementById('message').innerHTML = 'switch to the main network';
            } else {
                document.getElementById('message').innerHTML = '';
                ready = true;
            }
        }).catch(function (error) {
            console.error(error);
            document.getElementById('message').innerHTML = error.message ? error.message : error;
        });

        if (ethereum.on) {
            ethereum.on('chainChanged', function () {
                window.location.reload();
            });
        }
    }

    function checkInput(f) {
        if (!ready) {
            return;
        }
        var name = document.getElementById('name').value.toLowerCase();
        if (name.endsWith('.exglos.eth')) {
            name = name.substring(0, name.length - 11);
        }
        if (name.length < 1) {
            document.getElementById('message').innerHTML = 'enter the name';
            return document.getElementById('name').focus();
        }
        for (var i = 0; i < name.length; i++) {
            if (name.codePointAt(i) < 97 || name.codePointAt(i) > 122) {
                document.getElementById('message').innerHTML = `unacceptable symbol '${name.charAt(i)}'`;
                return document.getElementById('name').focus();
            }
        }
        document.getElementById('message').innerHTML = 'connecting...';
        ready = false;

        provider.send('eth_requestAccounts').then(function (accounts) {
            f(accounts[0], name);
        }).catch(function (error) {
            console.error(error);
            document.getElementById('message').innerHTML = error.message ? error.message : error;
            ready = true;
        });
    }

    function buy(account, name) {
        document.getElementById('message').innerHTML = 'checking availability...';
        provider.resolveName(`${name}.exglos.eth`).then(function (address) {
            if (address !== null) {
                document.getElementById('name').focus();
                throw Error('requested name is not available');
            }
            document.getElementById('message').innerHTML = 'creating transaction...';
            if (!confirm(`Are you ready to buy ${name}.exglos.eth?`)) {
                throw Error('canceled');
            }
            var exglosEns = new ethers.Contract(exglosEnsAddress, exglosEnsAbi, provider.getSigner());
            return exglosEns.buy(name, {value: '1000000000000000'});
        }).then(processResponse).catch(function (error) {
            console.error(error);
            document.getElementById('message').innerHTML = error.message ? error.message : error;
            ready = true;
        });
    }

    function register(account, name) {
        document.getElementById('message').innerHTML = 'checking forward record...';
        name = name + '.exglos.eth';
        provider.resolveName(name).then(function (address) {
            if (address === null) {
                throw Error('requested name has not been purchased yet');
            } else if (address.toLowerCase() !== account.toLowerCase()) {
                throw Error('you are not the owner');
            }
            document.getElementById('message').innerHTML = 'creating transaction...';
            if (!confirm(`Are you ready to register ${name}?`)) {
                throw Error('canceled');
            }
            var reg = new ethers.Contract(reverseRegistrarAddress, reverseRegistrarAbi, provider.getSigner());
            return reg.setName(name);
        }).then(processResponse).catch(function (error) {
            console.error(error);
            document.getElementById('message').innerHTML = error.message ? error.message : error;
            ready = true;
        });
    }

    function processResponse(response) {
        document.getElementById('message').innerHTML = 'pending <a target="_blank" ' +
            'href="https://etherscan.io/tx/' + response.hash + '">transaction</a>';
        ready = true;
        response.wait().then(function (receipt) {
            document.getElementById('message').innerHTML = '<a target="_blank" ' +
                'href="https://etherscan.io/tx/' + receipt.transactionHash +
                '">transaction</a> confirmed';
        }).catch(function (error) {
            console.error(error);
            document.getElementById('message').innerHTML = '<a target="_blank" ' +
                'href="https://etherscan.io/tx/' + (error.hash ? error.hash : error.transactionHash) +
                '">transaction</a> ' + (error.reason ? error.reason : 'rejected');
        });
    }
})();