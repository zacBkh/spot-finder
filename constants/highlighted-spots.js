import PROFILE_PIC_DEFAULT_OPTIONS from './default-profile-pic'

const HIGHLIGHTED_SPOTS_LANDING_PAGE = [
    {
        _id: '1',
        title: 'Sunset on the Eiffel Tower',
        categories: ['Sunset', 'Urban'],
        author: {
            name: 'Eric',
            profilePic: {
                link: PROFILE_PIC_DEFAULT_OPTIONS[0].link,
            },
            provider: 'credentials',
        },
        country: { name: 'France' },
        images: ['/v1686397294/highlighted-spots/eelokgajgslvreepjfkv.avif'],
        reviews: [
            {
                rate: 3.6,
            },
        ],
    },

    {
        _id: '2',
        title: 'Dubai Skyline',
        categories: ['Urban', 'Oceans'],
        author: {
            name: 'Eric',
            profilePic: {
                link: PROFILE_PIC_DEFAULT_OPTIONS[1].link,
            },
            provider: 'credentials',
        },
        country: { name: 'Dubai' },
        images: ['/v1686396899/highlighted-spots/fjvwxkr8etjksohv7f6s.avif'],

        reviews: [
            {
                rate: 4.9,
            },
        ],
    },

    {
        _id: '3',
        title: 'Burj Al Arab',
        categories: ['Urban', 'Sunset'],
        author: {
            name: 'Eric',
            profilePic: {
                link: PROFILE_PIC_DEFAULT_OPTIONS[2].link,
            },
            provider: 'credentials',
        },
        country: { name: 'Dubai' },
        images: ['/v1686397399/highlighted-spots/izonwu93bmbuqzlaydeq.avif'],
        reviews: [
            {
                rate: 4.2,
            },
        ],
    },
]

export default HIGHLIGHTED_SPOTS_LANDING_PAGE
