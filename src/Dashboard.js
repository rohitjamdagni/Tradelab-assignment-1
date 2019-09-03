import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { CTX } from "./Store";

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottom: "1px dotted black"
  },
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
    alignItems: "right"
  },

  flex: {
    display: "flex",
    alignItems: "center"
  },

  topicswindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey"
  },
  chatwindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  chatbox: {
    width: "85%"
  },
  button: {
    width: "15%"
  }
}));

export default function Dashboard({ username, onSignOut }) {
  const classes = useStyles();

  //CTX store
  const { allChats, sendChatAction, user } = React.useContext(CTX);

  const topics = Object.keys(allChats);

  //local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);

  const [textValue, changeTextValue] = React.useState("");

  return (
    <div>
      <Paper className={classes.root}>
        <div className={classes.header}>
          <div className="user-greeting">
            <nav>{username}</nav>
          </div>
          <div className="user-extras">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => onSignOut()}
            >
              Sign Out
            </Button>
          </div>
        </div>
        <Typography variant="h4" component="h4">
          Chat App
        </Typography>
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicswindow}>
            <List>
              {topics.map(topic => (
                <ListItem
                  onClick={e => changeActiveTopic(e.target.innerText)}
                  key={topic}
                  button
                >
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatwindow}>
            {allChats[activeTopic].map((chat, i) => (
              <div className={classes.flex} key={i}>
                <Chip label={chat.from} className={classes.chip} />
                <Typography variant="body1" gutterBottom>
                  {chat.msg}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label="Send a chat"
            className={classes.chatbox}
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              sendChatAction({
                from: user,
                msg: textValue,
                topic: activeTopic
              });
              changeTextValue("");
            }}
          >
            SEND
          </Button>
        </div>
      </Paper>
    </div>
  );
}
