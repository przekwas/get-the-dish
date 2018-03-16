import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import Table from '../table';
import { encode, decode } from '../utils/tokens';
import { checkPassword } from '../utils/security';

let usersTable = new Table('users');
let tokensTable = new Table('tokens');

function configurePassport(app) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    }, (email, password, done) => {
        usersTable.find({ email })
            .then((results) => results[0])
            .then((user) => {
                if (user && user.password) {
                    checkPassword(password, user.password)
                        .then((matches) => {
                            if (matches) {
                                //password is correct
                                tokensTable.insert({
                                    userid: user.id
                                })
                                    .then((idObj) => encode(idObj.id))
                                    .then((token) => {
                                        return done(null, { token, userid });
                                    });
                            } else {
                                //password is incorrect
                                return done(null, false, { message: 'Invalid credentials' });
                            }
                        }).catch((error) => {throw error;});
                } else {
                    //user email does not exist
                    return done(null, false, { message: 'Invalid credentials' });
                }
            }).catch((err) => {
                return done(err);
            });
    }));

    passport.use(new BearerStrategy((token, done) => {
        let tokenId = decode(token);
        if (!tokenId) {
            return done(null, false, { message: 'Invalid token' });
        }
        tokensTable.getOne(tokenId)
            .then((tokenRecord) => {
                return usersTable.getOne(tokenRecord.userid);
            }).then((user) => {
                if (user) {
                    delete user.password;
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid token' });
                }
            }).catch((err) => {
                return done(err);
            });
    }))

    app.use(passport.initialize());
}

export default configurePassport;