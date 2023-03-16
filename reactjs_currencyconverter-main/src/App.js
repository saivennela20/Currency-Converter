import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currencies: ['USD', 'AUD', 'SGD', 'PHP', 'EUR'],
        base: 'USD',
        amount: '',
        convertTo: 'EUR',
        result: '',
    }
  }

  handleSelect = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      result: null
    },
    this.calculateResult
    );
  }

  handleInput = (e) => {
    this.setState({
      amount: e.target.value,
      result: null
    },
    this.calculateResult
    );
  }

  calculateResult = () => {
    if (this.state.amount === isNaN) {
        return;
    } 
    else {
      /* THIS API IS NO LONGER FREE
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res => res.json())
      .then((data) => {
        const date = data.date;
        const result = (data.rates[this.state.convertTo] * this.state.amount).toFixed(4);
        this.setState({
          result,
          date
        });
      })
      .catch((err) => {
        console.error('Error: ', err);
      })
      */
      fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=${this.state.convertTo}&from=${this.state.base}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
          "x-rapidapi-key": "6f091c3508msh3b56a5a642252cap1e0359jsncd5db2d44811"
        }
      })
      .then(res => res.json())
      .then((data) => {
        // data is the exchange rate
        console.log(data);
        this.setState({
          result: data * this.state.amount
        })
      })
      .catch(err => console.error(err));
    }
  }

  handleSwap = (e) => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState({
      base: convertTo,
      convertTo: base,
      result: null
    },
    this.calculateResult
    );
  }

  render() {
    const { currencies, base, amount, convertTo, result } = this.state;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card card-body">
              <h1 className="text-center">Currency Converter</h1>
              <br/><br/>
              <h5>{amount} {base} is equivalent to</h5>
              <h2>{result === null ? '...' : result} {convertTo}</h2>
              <br/>
              <div className="row">
                <div className="col-sm-10">
                  <form className="form-inline mb-4">
                    <input 
                      type="number" 
                      value={amount}
                      onChange={this.handleInput}
                      className="form-control form-control-lg mx-3" 
                    />
                    <select 
                      name="base" value={base}
                      onChange={this.handleSelect} 
                      className="form-control form-control-lg"
                    >
                      {currencies.map((currency) => 
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      )}
                    </select>
                  </form>

                  <form className="form-inline mb-4">
                    <input 
                      disabled={true}
                      value={result === null ? 'Calculating...' : result}
                      className="form-control form-control-lg mx-3" 
                    />
                    <select name="convertTo" value={convertTo} 
                      onChange={this.handleSelect}
                      className="form-control form-control-lg"
                    >
                      {currencies.map((currency) => 
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      )}
                    </select>
                  </form>
                </div>

                <div className="col-sm-2 align-self-center">
                  <h1 onClick={this.handleSwap} className="swap">&#8595;&#8593;</h1>
                </div>

              </div> {/* End of row */}
            </div> {/* End of card */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
