import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles }  from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    }
});

const databaseURL = "https://word-cloud-c4365.firebaseio.com/";

class Words extends React.Component {
    constructor() {
        super();
        this.state = {
            // words: {}
            dialog: false,
            word:'',
            weight: ''
        };
    }
    _get() {
        fetch(`${databaseURL}/words.json`).then(res => {
            if (res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(words => this.setState({ words: words }));
    }
    _post(word) {
        return fetch(`${databaseURL}/words.json`, {
            method: 'POST',
            body: JSON.stringify(word)
        }).then(res => {
            if(res.status !=200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {  //추가한 데이터만 갱신
            let nextState = this.state.words;
            nextState[data.name] =words;
            this.setState({words: nextState});
        });
    }
    _delete(id) {
        return fetch(`${databaseURL}/words/${id}.json`, {
            method: 'DELETE'
        }).then(res => {
            if(res.status !=200) {
                thorw new Error(res.statusText);
            }
            return res.json();
        }).then(() => {
            let nextState = this.state.words;
            // nextState[data.name] =words;
            delete nextState[id];
            this.setState({words: nextState});

        })
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.words != this.state.words;
    // }

    componentDidMount() {
        this._get();
    }
    handleDialogToggle = () => this.setState({
        dialog: !this.state.dialog
    })
    handleValueChange = (e) => {//입력한이름을 보여준다
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    handleSubmit = () => { //입력함수
        const word = {
            word: this.state.word,
            weight: this.state.weight 
        }
        this.handleDialogToggle();
        if(!word.word && !word.weight) {
            return;
        }
        this._post(word);
    }
    handleDelete = (id) => {//삭제함수}
        this._delete(id);
    }

    render() {
        return (
            <div>
                {Object.keys(this.state.words).map(id => {
                    const word = this.state.words[id];
                    return (
                        <div key={id}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        가중치: {word.weight}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h5" component="h2">
                                            {word.word}
                                            </Typography>
                                        </Grid>
                                        <Grid i tem xs={6}>
                                            <Button variant="contained" color="primary" onClick={() => this. handleDelete(id)}>삭제</Button>
                                        </Grid>
                                    </Grid>


                                </CardContent>
                            </Card>
                            <br/>
                        </div>
                    );
                } )}
            </div>
        );
    }
}

export default Words;

