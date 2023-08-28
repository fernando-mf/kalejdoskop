type PlaylistImage = {
    height: number
    width: number
    url: string
}

type PlaylistAlbum = {
    id: string
    images: PlaylistImage[]
}

type PlaylistArtist = {
    id: string
    name: string
}

type PlaylistTrack = {
    id: string
    duration_ms: number
    name: string
    album: PlaylistAlbum
    artists: PlaylistArtist[]
    is_local: boolean
    preview_url: string
    popularity: number
}

type PlaylistTrackItem = {
    track: PlaylistTrack
    is_local: boolean
}

type SpotifyUser = {
    id: string
    display_name: string
}

export type Playlist = {
    images: PlaylistImage[]
    name: string
    public: boolean
    collaborative: boolean
    description: string
    tracks: {
        items: PlaylistTrackItem[]
    }
    owner: SpotifyUser
}