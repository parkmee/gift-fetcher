/**
 * Helper function to get the library with access to the google plus api.
 */
  function getGooglePlusApi(auth) {
    return google.plus({ version: 'v1', auth });
  }
  
  /**
   * Extract the email and id of the google account from the "code" parameter.
   */
  function getGoogleAccountFromCode(code) {
    
    // get the auth "tokens" from the request
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    
    // add the tokens to the google api so we have access to the account
    const auth = createConnection();
    auth.setCredentials(tokens);
    
    // connect to google plus - need this to get the user's email
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    
    // get the google id and email
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
  
    // return so we can login or sign up the user
    return {
      id: userGoogleId,
      email: userGoogleEmail,
      tokens: tokens, // you can save these to the user if you ever want to get their details without making them log in again
    };
  }
  