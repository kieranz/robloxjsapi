var http = require('../util/http.js').func
var getGeneralToken = require('../util/getGeneralToken.js').func
var getJar = require('../util/jar.js').func

exports.required = ['participants', 'uaids']

function sendTrade(participants, uaids, token) {
		return new Promise((resolve, reject) => {
			let json = {
				AgentOfferList: [
					{
						AgentID: participants[0],
						OfferList: [
							{
								UserAssetID: uaids[0]
							}
						],
						OfferRobux: 0,
						OfferValue: 1
					},
					{
						AgentID: participants[1],
						OfferList: [
							{
								UserAssetID: uaids[1]
							}
						],
						OfferRobux: 0,
						OfferValue: 1
					}
				],
				isActive: false,
				TradeStatus: "Open"
			}

			request({
				url: "https://www.roblox.com/Trade/tradehandler.ashx",
				method: 'POST',
				headers: {
					'X-CSRF-TOKEN': token
				},
				form: {
					cmd: 'send',
					TradeJSON: JSON.stringify(json)
				}
			}, (err, resp, body) => {
				if(err) return reject(err);
				if(resp.statusCode != 200) return reject(new Error('Request failed.'));
				resolve(JSON.parse(body)['msg'] == "Trade sent!");
			});
		});
	}
}

exports.func = function (args) {
  let participants = args.participants
  let uaids = args.uaids
  return getGeneralToken({jar: getJar()})
    .then(function (xcsrf) {
      return groupPayout(particpants, uaids, getGeneralToken())
    })
}
