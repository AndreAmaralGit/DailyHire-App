import React, { useState, useMemo, useEffect, useContext } from 'react';
import { Provider } from 'react-native-paper';
import { theme } from './src/core/theme';
import Navigator from "./src/index";
import { UserContext } from './src/UserContext';


const App = () => {

  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const user2 = useContext(UserContext);

  const getNotificationsCounter = () => {
    if (!(user == null)) {

      fetch('http://localhost:8080/notifications/findNotifications', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user['_id']
        }),
      }).then((response2) => {
        return response2.json();
      }).then((responseText2) => {

        if ((responseText2 && responseText2.length > 0)) {

          let user2 = user;

          user2['showBadge'] = true;
          user2['counter'] = responseText2.length;
          setUser(user2)



        } else {

          let user2 = user;

          user2['showBadge'] = false;
          user2['counter'] = responseText2.length;
          setUser(user2)


        }

      })
    }
  }

  useEffect(() => {
    timer = setInterval(() => getNotificationsCounter(), 15000)
  });

  return (
    <Provider theme={theme}>
      <UserContext.Provider value={value}>
        <Navigator />
      </UserContext.Provider>
    </Provider>
  )
};

export default App;
