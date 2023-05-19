import { alumni } from "../alumni/alumni.data"
import { events } from "../events/events.data"
import { gallery } from "../gallery/gallery.data"
import { team } from "../team/team.data"
import { WindowsService } from "../windows.service"

let eventsStruct = events.map((event : any) => {
    return {
        showText: `${event.title}.evnt`,
        access: true,
        name: 'event',
        indexOfDir: 5,
        type: '.evnt',
        folder: false,
        exec: () => WindowsService.injector.get(WindowsService).openEvent(event)
    }
})

let documentStruct = [...team, ...alumni].map((member : any) => {
    return {
        showText: `${member.name}.prtfl`,
        access: true,
        name: 'portofolio',
        indexOfDir: 5,
        type: '.prtfl',
        folder: false,
        exec: () => WindowsService.injector.get(WindowsService).openPortfolio(member)
    }
})

let galleryStruct = gallery.map((image : any, i : number) => {
    return {
        showText : `${image.name}.img`,
        access: true,
        name: 'image',
        indexOfDir: 5,
        type: '.img',
        folder: false,
        exec: () => WindowsService.injector.get(WindowsService).openImage(i)
    }
})

export let structure = [
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span><span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 0,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 0,
                access: true,
                folder: true,
            },
            {
                showText : 'Program Files',
                indexOfDir : 0,
                access: false,
                folder: true,
            },
            {
                showText : 'Program Files(x86)',
                indexOfDir : 0,
                access: false,
                folder: true,
            },
            {
                showText : 'System',
                indexOfDir : 0,
                access: false,
                folder: true,
            },
            {
                showText : 'Users',
                indexOfDir : 1,
                access: true,
                folder: true,
            },
        ],
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 1,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 0,
                access: true,
                folder: true,
            },
            {
                showText : 'admin',
                indexOfDir : 14,
                access: false,
                folder: true
            },
            {
                showText : 'Public',
                indexOfDir : 2,
                access: true,
                folder: true,
            },
        ],
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 2,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 1,
                access: true,
                folder: true,
            },
            {
                showText : 'Contacts',
                indexOfDir : 3,
                access: true,
                folder: true
            },
            {
                showText : 'Desktop',
                indexOfDir : 4,
                access: true,
                folder: true,
            },
            {
                showText : 'Documents',
                indexOfDir : 5,
                access: true,
                folder: true,
                exec : () => WindowsService.injector.get(WindowsService).openWindow('documents')
            },
            {
                showText : 'Downloads',
                indexOfDir : 15,
                access: true,
                folder: true,
            },
            {
                showText : 'Favorites',
                indexOfDir : 6,
                access: true,
                folder: true,
            },
            {
                showText : 'Links',
                indexOfDir : 7,
                access: true,
                folder: true,
            },
            {
                showText : 'Images',
                indexOfDir : 9,
                access: true,
                folder: true,
                exec : () => WindowsService.injector.get(WindowsService).openWindow('images')
            },
        ],
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Contacts<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 3,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 2,
                access: true,
                folder: true,
            },
            {
                showText : 'Developer',
                indexOfDir : 3,
                access: false,
                folder: true,
            },
            {
                showText : 'Motricala Alin-Gabriel{motricala44@gmail.com}',
                indexOfDir : 3,
                access: false,
                folder: true,
            },
        ],
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Desktop<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 4,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 2,
                access: true,
                folder: true,
            },
            {
                showText : 'Gallery',
                indexOfDir : 10,
                access: true,
                folder: true,
                exec : () => WindowsService.injector.get(WindowsService).openWindow('gallery')
            },
            {
                showText : 'Team',
                indexOfDir : 11,
                access: true,
                folder: true,
                exec : () => WindowsService.injector.get(WindowsService).openWindow('team')
            },
            {
                showText : 'Alumni',
                indexOfDir : 12,
                access: true,
                folder: true,
                exec : () => WindowsService.injector.get(WindowsService).openWindow('alumni')
            },
            {
                showText : 'Events',
                indexOfDir : 13,
                access: true,
                folder: true,
                exec : () => WindowsService.injector.get(WindowsService).openWindow('events')
            },
            {
                showText : 'CyCL',
                name : 'cl',
                type: 'cmd',
                access: true,
                folder: false,
                exec : () => WindowsService.injector.get(WindowsService).openWindow('cl')
            }
        ]
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Documents<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 5,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 2,
                access: true,
                folder: true,
            },
            ...documentStruct
        ]
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Favorites<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 6,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 2,
                access: true,
                folder: true,
            },
        ]
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Links<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 7,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 2,
                access: true,
                folder: true,
            },
        ]
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Music<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 8,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 2,
                access: true,
                folder: true,
            },
        ]
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Images<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 9,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 2,
                access: true,
                folder: true,
            },
            ...galleryStruct
        ]
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Desktop/Gallery<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 10,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 4,
                access: true,
                folder: true,
            },
            ...galleryStruct
        ]
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Desktop/Team<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 11,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 4,
                access: true,
                folder: true,
            },
            ...documentStruct.slice(0, 18)
        ]
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Desktop/Alumni<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 12,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 4,
                access: true,
                folder: true,
            },
            ...documentStruct.slice(18, 62)
        ]
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Desktop/Events<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 14,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 4,
                access: true,
                folder: true,
            },
            ...eventsStruct
        ]
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/admin<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 14,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 1,
                access: true,
                folder: true,
            },
            {
                showText : 'chess.exe',
                indexOfDir : 14,
                access: true,
                folder: false,
                exec: () => WindowsService.injector.get(WindowsService).openWindow('chess')
            },
        ]
    },
    {
        dir : "<span class='origin'>cyliis@cyliis:~</span>/Users/Public/Downloads<span class='func'>$</span>",
        folders : [
            {
                showText : '.',
                indexOfDir : 15,
                access: true,
                folder: true,
            },
            {
                showText : '..',
                indexOfDir : 2,
                access: true,
                folder: true,
            },
            {
                showText : 'resolve.exe',
                indexOfDir : 15,
                access: true,
                folder: false,
                exec: () => WindowsService.injector.get(WindowsService).openWindow('resolve')
            },
        ]
    },
]