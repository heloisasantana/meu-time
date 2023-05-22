import React from 'react';

class Initial extends React.Component {
  constructor() {
    super();
    this.state = {
        key: '',
        isDisabled: true,
        countries: [],
        country: '',
        leagues: [],
        league: '',
        seasons: [],
        season: 0,
        teams: [],
    };
    this.validateKey = this.validateKey.bind(this);
    this.singUpUser = this.singUpUser.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.changeLeague = this.changeLeague.bind(this);
    this.selectLeague = this.selectLeague.bind(this);
    this.changeSeason = this.changeSeason.bind(this);
    this.selectSeason = this.selectSeason.bind(this);
  }

  validateKey(event) {
    const { value } = event.target;
    this.setState({
        key: value,
        isDisabled: false,
    })
  }

  singUpUser() {
    const { key } = this.state;

    let myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", key);
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://v3.football.api-sports.io/countries", requestOptions)
        .then(response => response.text())
        .then(result => this.setState({ countries: JSON.parse(result).response }))
        .catch(error => console.log('error', error));
  }

  changeCountry(event) {
    const { value } = event.target;
    this.setState({
        country: value,
    })
  }

  selectCountry() {
    const { country, key } = this.state;

    let myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", key);
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let url = `https://v3.football.api-sports.io/leagues?country=${country}`

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => this.setState({ leagues: JSON.parse(result).response }))
        .catch(error => console.log('error', error));
    }

    changeLeague(event) {
      const { name } = event.target;
      this.setState({
          league: name,
      })
    }

    selectLeague() {
      const { league, leagues } = this.state;
      this.setState({
          seasons: leagues.map((item) => item.league.name === league ? item.seasons : [] ),
      })
    }

    changeSeason(event) {
      const { value } = event.target;
      this.setState({
          season: value,
      })
    }

    selectSeason() {
      const { league, season, key } = this.state;
  
      let myHeaders = new Headers();
      myHeaders.append("x-rapidapi-key", key);
      myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
  
      let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };
  
      let url = `https://v3.football.api-sports.io/teams?league=${league}&season=${season}`
      // API para times específicos da liga e temporada:
      // https://v3.football.api-sports.io/teams?league=134&season=2011
  
      fetch(url, requestOptions)
          .then(response => response.text())
          .then(result => this.setState({ teams: JSON.parse(result).response }))
          .catch(error => console.log('error', error));
      }

  render() {
    const { key, isDisabled, countries, leagues, seasons, teams } = this.state;
    return (
      <div>
        <div>
          <label>
            <input
              type="text"
              value={ key }
              onChange={ this.validateKey }
            />
          </label>
          <input
            name="button"
            type="submit"
            value="Entrar"
            disabled={ isDisabled }
            onClick={ this.singUpUser }
          />
        </div>
        { countries.length > 0 &&
          <div>
            <select onChange={ this.changeCountry }>
              { countries.map((country) => (
                <option>{country.name}</option>
              ))}
            </select>
            <input
              type="submit"
              value="Confirmar"
              onClick={ this.selectCountry }
            />
          </div>}
        { leagues.length > 0 && 
          <div>
            <select onChange={ this.changeLeague }>
              { leagues.map((item) => (
                  <option name={item.league.code}>{item.league.name}</option>
              ))}
            </select>
            <input
              type="submit"
              value="Confirmar"
              onClick={ this.selectLeague }
            />
          </div>}
        { seasons.length > 0 &&
          <div>
            <select onChange={ this.changeSeason }>
              { seasons.map((season) => (
                  <option>{season.year}</option> 
              ))}
            </select>
            <input
              type="submit"
              value="Confirmar"
              onClick={ this.selectSeason }
            />
          </div>}
        { teams.length > 0 && 
          <div>
            <select onChange={ this.changeTeam }>
              { teams.map((team) => (
                  <option name={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
        }
      </div>
    );
  }
}

export default Initial;
