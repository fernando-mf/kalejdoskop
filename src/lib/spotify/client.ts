import axios, {AxiosInstance} from 'axios'

import {Playlist} from './types'
import {RequestEventLoader} from "@builder.io/qwik-city";

const MS_SECOND = 1000
const MS_MINUTE = 1000 * 60

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1'

type AccessTokenResponse = {
    access_token: string
    token_type: string
    expires_in: number // seconds
}

function spotifyAuthManager(clientID: string, clientSecret: string) {
    const client_id = clientID
    const client_secret = clientSecret
    let expiresAt = Date.now() - MS_MINUTE // 1 minute ago, expired
    let accessToken: string | null = null

    return {
        expired: () => Date.now() >= expiresAt || !accessToken,
        refreshToken: () => axios.request<AccessTokenResponse>({
            method: 'POST',
            url: SPOTIFY_TOKEN_URL,
            data: {
                grant_type: 'client_credentials',
                client_id,
                client_secret,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(({data: {access_token, expires_in}}) => {
            accessToken = access_token
            expiresAt = Date.now() + (expires_in * MS_SECOND)
        }),
        getAccessToken: () => accessToken,
    }
}

class SpotifyAPI {
    private authManager: ReturnType<typeof spotifyAuthManager>
    private client: AxiosInstance

    constructor(clientId: string, clientSecret: string) {
        this.authManager = spotifyAuthManager(clientId, clientSecret)
        this.client = axios.create({
            baseURL: SPOTIFY_BASE_URL,
        })

        this.client.interceptors.request.use(async (req) => {
            if (this.authManager.expired()) {
                await this.authManager.refreshToken()
            }

            req.headers['Authorization'] = `Bearer ${this.authManager.getAccessToken()}`
            return req
        })
    }

    getPlaylist(playlistId: string) {
        return this.client.get<Playlist>(`/playlists/${playlistId}`).then(({data}) => data)
    }
}

// SpotifyAPI factory, returns a function that gets the spotifyAPI from Qwik's request event loader
function spotifyAPIFactory() {
    let api: SpotifyAPI | null = null;
    return function (loader: RequestEventLoader): SpotifyAPI {
        if (!api) {
            const clientId = loader.env.get('SPOTIFY_CLIENT_ID') ?? ''
            const clientSecret = loader.env.get('SPOTIFY_CLIENT_SECRET') ?? ''

            api = new SpotifyAPI(clientId, clientSecret)
        }

        return api
    }
}

export const spotifyAPI = spotifyAPIFactory()