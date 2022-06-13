const { request } = require('https');

const pRequest = (options, data) => {
    return new Promise((resolve, reject) => {
        const req = request(options, res => {
            let text = "";
            res.on('data', d => text += d.toString());
            res.on('end', () => {
                try {
                    resolve(JSON.parse(text));
                } catch (error) {
                    resolve(text);
                };
            });
            res.on('error', reject);
        });
        if (data && req.writable) {
            req.write(JSON.stringify(data));
        };
        req.on('error', reject);
        req.end();
    });
};

const discordRequest = (endpoint, token, method, data) => {
    return pRequest({
        method,
        hostname: 'discord.com',
        path: '/api/v9' + endpoint,
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json'
        }
    }, data);
};

const wait = time => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
};

module.exports = {
    pRequest,
    discordRequest,
    wait
};