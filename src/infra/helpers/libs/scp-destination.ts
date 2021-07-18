/* eslint-disable camelcase */
import axios from 'axios';
import xsenv from '@sap/xsenv';
import querystring from 'querystring';
import btoa from 'btoa';

export class SCPDestinations {
	static async getDestinationInfo(destSrvInstance: string, destName: string): Promise<any> {
		try {
			const { dest } = xsenv.getServices({
				dest: destSrvInstance
			});

			const sDestCreds = `${dest.clientid}:${dest.clientsecret}`;
			const b64DestCreds = btoa(sDestCreds);
			const { data } = await axios.post(
				`${dest.url}/oauth/token`,

				querystring.stringify({
					client_id: dest.clientid,
					grant_type: 'client_credentials'
				}),
				{
					headers: {
						Authorization: `Basic ${b64DestCreds}`,
						'Content-type': 'application/x-www-form-urlencoded'
					}
				}
			);
			const sToken: string = data.access_token;
			const oDestination = await axios.get(
				`${dest.uri}/destination-configuration/v1/destinations/${destName}`,
				{
					headers: {
						Authorization: `Bearer ${sToken}`
					}
				}
			);
			return oDestination.data;
		} catch (err) {
			throw new Error((err as Error).message || 'Internal Server Error');
		}
	}
}
