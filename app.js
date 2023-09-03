const express = require('express');
const router = require('./routes/user_routes');
const admin_auth_routes = require('./routes/admin_auth_routes');
const user_auth_routes = require('./routes/user_auth_routes');
const authentication = require('./auth_service/authentication');
const admin_authorization = require('./auth_service/authorization/admin_authorization');
const user_autorization = require('./auth_service/authorization/user_authorization');
const errorHandler = require('./utils/errorHandler');
const AppError = require('./utils/error');
const app = express();
app.use(express.json());

app.use("/api/user", router)
app.use("/api/auth/ad", authentication, admin_authorization, admin_auth_routes)
app.use("/api/auth/us", authentication, user_autorization, user_auth_routes)

app.all("*", (req, res, next) => {
    next ( new AppError("url not found", 404) );
})

app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, () => {
    console.log('server running on port ' + PORT);
})