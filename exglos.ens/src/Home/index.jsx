import React from 'react';


import Nav from '../components/Nav';
import { getSigner } from '../ens';

function Home() {
   
    const [searchInput, setSearchInput] = React.useState('')
    const [searchResult, setSearchResult] = React.useState('')
    const [cartItem, setCartItem] = React.useState('')


    const onchange = (evt) => {
        setSearchInput(evt.target.value)
    }

    const searchSubdomainOwner = async (event) => {
        setSearchResult('')
        event.preventDefault()
        const [signer, provider] = await getSigner()

        const address = await signer.provider.resolveName(searchInput)
        if (address) setSearchResult(`Subdomain already taken by: ${address}`)
        else setCartItem(searchInput)

    }


    return (
        <>
            <main>
                <Nav/>
                <div className="container" style={{ marginTop: "5rem" }}>
                    <div className="row my-8">
                        <div className="col-md-6 col-sm-7 my-8 mx-auto">
                            <div className="card my-8 p-3">
                                <h3 className="mx-auto">Exglos subdomains</h3>
                                <p>
                                    Search your favorite <small>.exglos.eth</small> Subdomain
                                </p>
                                <form className="d-flex">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="" className="form-label">
                                                check subdomain
                                            </label>
                                            <input
                                                type="text"
                                                name=""
                                                id=""
                                                className="form-control"
                                                placeholder=""
                                                aria-describedby="helpId"
                                                value={searchInput}
                                                onChange={onchange}
                                            />
                                            <div className="d-grid gap-2 mb-2 mt-1">
                                                <button
                                                    onClick={searchSubdomainOwner}
                                                    type="button"
                                                    name=""
                                                    id=""
                                                    className="btn btn-primary"
                                                    disabled={searchInput ? false : true}
                                                >
                                                    Search
                                                </button>
                                            </div>
                                            {searchResult && (<div className="alert alert-success" role="alert">
                                                <strong>Result <br /></strong>
                                                <small>{searchResult}</small>
                                            </div>)}
                                            {cartItem && (<div className="alert alert-success" role="alert">
                                                <strong>{cartItem}</strong>
                                                <small> is available, you can claim {cartItem}!</small><br />
                                                <a href={`/claim/${cartItem}`} className="btn btn-success">Claim</a>
                                            </div>)}

                                            <small id="helpId" className="text-muted">
                                                Search your favorite exglos ENS subdomain(eg foo.exglos.eth)
                                                Please connect your Metamask wallet first.
                                            </small>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: "5rem" }}>
                    <div className="row">
                        <h3>Pricing</h3>
                        <p className="p3-m-3">
                            Get your own ens domain
                            .exglos.eth Only for exglos holders. Do not rent, buy forever!
                            Simple purchase without auctions and time delays. Price (not
                            including gas price):

                        </p>
                        <div className="col-md-2">
                            <div className="card mt-2 p-2">
                                <h4>2 symbols</h4>
                                <p>1eth</p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card mt-2 p-2">
                                <h4>3 symbols</h4>
                                <p>0.1eth</p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card mt-2 p-2">
                                <h4>4 symbols</h4>
                                <p>0.01eth</p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card mt-2 p-2">
                                <h4>5 symbols</h4>
                                <p>0.001eth</p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card mt-2 p-2">
                                <h4>6(or more)</h4>
                                <p>free</p>
                            </div>
                        </div>
                        <div className="col-md-2" />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;
