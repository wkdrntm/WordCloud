import React from 'react';
import  {HashRouter as Router, Route} from 'react-router-dom';
import AppShell from './AppShell'
import Home from './Home';
import Texts from './Texts';
import Words from './Words'

class App extends React.Component{
    render(){
        return (
            <Router>
                <AppShell>
                    <div>
                        <Route exact path = "/"  Component={Home} />
                        <Route exact path = "/Texts"  Component={Texts} />
                        <Route exact path = "/Words"  Component={Words} />
                    </div>
                </AppShell>
            </Router>
            
        );
    }
}

export default App;
