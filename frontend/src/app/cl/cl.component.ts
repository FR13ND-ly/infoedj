import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription, timer } from 'rxjs';
import { structure } from './folder-structure.data';
import { WindowsService } from '../windows.service';
import { UserService } from '../user.service';
import { resolve } from './resolve.data';

@Component({
  selector: 'app-cl',
  templateUrl: './cl.component.html',
  styleUrls: ['./cl.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClComponent implements AfterViewInit, OnDestroy {

  constructor(private windowsService : WindowsService, private userService : UserService) { }

  @ViewChild('consoleInput') consoleInput! : ElementRef
  @ViewChild('cl') clRef! : ElementRef

  content : string = `
  CyOS [Version 10.0.22000.978]<br>
  (c) CyLIIS. All rights reserved.
  `

  folderStructure = structure
  folderIndex : any = 2
  init = true
  dir$ = new BehaviorSubject(this.folderStructure[this.folderIndex].dir)
  title = "CyCL"
  vim : boolean = false
  fullscreen : boolean = false
  inputs = ['']
  indexOfInput = 0

  subscription! : Subscription

  ngAfterViewInit(): void {
    timer(10).subscribe(() => this.setInputFocus())
    let marginTop = Math.floor(Math.random() * 10);
    let marginLeft = Math.floor(Math.random() * 10) + 30
    let window: any = document.querySelector(`app-cl .window`)
    window.style.transform = `translateX(${marginLeft}vw)` 
    window.style.transform += `translateY(${marginTop}vh)` 
    this.subscription = fromEvent(document, 'keydown').subscribe(() => {
      this.consoleInput.nativeElement.focus()
    })
  }

  setInputFocus() {
    this.consoleInput.nativeElement.focus()
  }

  onInput(e : any) {
    if (e.key == "Enter") {
      if (this.vim) {
        if (e.target.value == ':q') this.windowsService.closeWindow('cl')
        this.content += `${e.target.value}</br>`
        e.target.value = ''
        return
      }
      if (this.init) {
        this.content += `<p></p><span class="dir">${this.dir$.value}</span> ${e.target.value}<br>`
        this.init = false
      }
      else this.content += `<span class="dir">${this.dir$.value}</span> ${e.target.value}<br>`
      if (e.target.value.trim()) this.resolveCommand(e.target.value.trim().replace(/\s\s+/g, ' ').split(" "))
      this.inputs[this.inputs.length - 1] = e.target.value
      this.indexOfInput = this.inputs.length
      this.inputs.push('')
      e.target.value = ''
    }
    else if (e.keyCode == 38 && this.indexOfInput) this.indexOfInput--
    else if (e.keyCode == 40 && this.indexOfInput != (this.inputs.length - 1)) this.indexOfInput++
  }

  resolveCommand(commands : any) {
    let app = this.getApp(commands)
    let command = commands.shift().toLowerCase()
    if (app?.exec) app?.exec()
    else if (command == 'bgimage') this.changeDesktopImage(commands)
    else if (command == 'promocode') this.promocode(commands)
    else if (command == 'cd') this.cd(commands.join(" "))
    else if (command == 'clear') this.content = `<p></p>`
    else if (command == 'color') this.changeSystemColor(commands)
    else if (command == 'echo') this.content += commands.join(" ")
    else if (command == 'exit') this.windowsService.closeWindow('cl')
    else if (command == 'ftype') this.ftype(commands)
    else if (command == 'help') this.content += this.help()
    else if (command == 'hint') this.hint()
    else if (command == 'history') this.content += this.history()
    else if (command == 'icons') this.setIcons(commands)
    else if (command == 'login') this.login()
    else if (command == 'logs') this.logs()
    else if (command == 'logout') this.logout()
    else if (command == 'ls') this.ls(commands)
    else if (command == 'mag') this.mag()
    else if (command == 'neofetch') this.neoFetch()
    else if (command == 'resolve') this.resolve(commands)
    else if (command == 'rm') this.content += ":))"
    else if (command == 'shutdown') this.shutdown()
    else if (command == 'state') this.state()
    else if (command == 'title') this.title = commands.join(" ")
    else if (command == 'time') this.content += new Date()
    else if (command == 'ver') this.content += "<p></p>CyLIIS CyOS [Version 10.0.22000.978]"
    else if (command == 'vim') this.initVim()
    else this.content += `'${command}' is not recognized as an internal or external command, operable program or batch file.`
    this.content += "<p></p>"
    timer(0).subscribe(() =>this.clRef.nativeElement.scrollTop = this.clRef.nativeElement.scrollHeight)
  }

  async initVim() {
    this.vim = true
    this.content = ``
    this.title = "Vim"
    console.log((await this.userService.getCodes())[1])
  }

  resolve(commands : any) : any {
    if (!this.userService.getUser()) return this.content += `You don't currently have permission to execute this command.`
    let response = commands[0] ? commands[0].trim().toLowerCase() : false
    let resolves = resolve
    let level = this.userService.getUser().resolveLevel
    if (level == resolves.length) return this.content += `You've finished criptography.`
    if (!response) this.content += `
      Invalid syntax:<br>
      resolve [response]<br><br>
      Q: <span class="mark">${resolves[level].question}</span>
      `
    else if (resolves[level].answer().includes(response)) {
      this.content += 
      `Correct<br>`
      this.userService.nextResolveLevel()
      level++
      if (level < resolves.length) {
        this.content += `Next: <span class="mark">${resolves[level + 1].question}</span>`
      }
      else {
        this.content += `You've finished typography</span>`
      }
    }
    else this.content += 'Wrong answer'
  }

  async promocode(commands : any) : Promise<any> {
    if (!this.userService.getUser()) return this.content += `You don't currently have permission to execute this command.`
    if (!commands[0]) return this.content += `
      Invalid syntax:<br>
      promocode <span class="mark">[code]</span><br><br>

      <span class="mark">Ex:</span> promocode bW90cmljYWxhNDRAZ21haWwuY29t
    `
    if ((await this.userService.getCodes()).includes(commands[0])) {
      this.content += `Your code was succesfuly converted into points.<br><br>`
      this.userService.setCode(commands[0])
    }
  }

  async logs() {
    this.content += "<br>click here to get results<br><br>"
    this.content += await this.userService.getLogs()
    this.content += "<br>"
  }

  state() : any {
    let user = this.userService.getUser() 
    if (!this.userService.getUser()) return this.content += `You don't currently have permission to execute this command.`
    this.content += this.userService.getUserState(user)
  }

  login() : any {
    if (this.userService.getUser()) return this.content += `You're already authenticated.`
    this.userService.login()
  }

  logout() : any {
    if (!this.userService.getUser()) return this.content += `You're not authenticated.`
    this.userService.logout()
  }

  cd(path : string) {
    let dirs = path.split("/").join('\\').split('\\')
    let initIndex = this.folderIndex
    if (dirs[0] == '~' || dirs[0] == "home") {
      this.folderIndex = 0
      this.dir$.next(this.folderStructure[this.folderIndex].dir)
      return
    }
    dirs.forEach((dir: string) => {
      let check = false
      this.folderStructure[this.folderIndex].folders.forEach((el) : any => {
        if (el.showText.toLowerCase() == dir.toLowerCase()) {
          check = true
          console.log(this.userService.getUser())
          if (el.access || (this.userService.getUser() && el.showText == 'admin')) {
            this.folderIndex = el.indexOfDir
            this.dir$.next(this.folderStructure[this.folderIndex].dir)
          }
          else {
            this.content += 'Access Denied'
          }
        } 
      })
      if (!check) {
        this.folderIndex = initIndex
        this.dir$.next(this.folderStructure[this.folderIndex].dir)
        this.content += 'The system cannot find the path specified.'
        return
      } 
    })
  }

  ftype(commands : any) {
    let app = (<any>this.folderStructure[this.folderIndex].folders).find((el : any) => {
      return el.showText.toLowerCase() == commands.join(" ").toLowerCase()
    })
    this.content += app.type
  }

  getApp(commands : any) {
    return (<any>this.folderStructure[this.folderIndex].folders).find((el : any) => {
      return el.showText.toLowerCase() == commands.join(" ").toLowerCase()
    })
  }

  ls(commads : any) : any {
    if (commads[0] == "-l") return this.lsMerge()
    let text = "<pre class='ls'>"
    this.folderStructure[this.folderIndex].folders.forEach((el) => {
      let className = ''
      if (el.folder) className = "folder"
      if (!el.access) className = "restricted"
      text += `<span class="${className}">${el.showText}      </span>`
    })
    text += "</pre>"
    this.content += text
  }

  async lsMerge() {
    this.folderStructure[this.folderIndex].folders.forEach((el) => {
      this.content += `<pre>26/02/2004  01:25 PM    ${el.folder ? '<span class="folder">DIR</span>' : '   '}          ${el.access ? el.showText : `<span class="restricted">${el.showText}</span>`} </pre>`
    })
    console.log((await this.userService.getCodes())[2])
  }

  setIcons(commands : any) {
    if (!commands[0]) {
      this.content += `
        light = MAG-Light<br>
        dark = MAG-Dark<br>`
    }
    switch (commands[0]) {
      case 'light':
        return localStorage.setItem('icons', '')
      case 'dark':
        return localStorage.setItem('icons', 'dark/')
      default:
        break;
    } 
  }

  async shutdown() {
    console.log((await this.userService.getCodes())[3])
    var myWindow : any = window.open("", "_self");
    myWindow.document.write("");
    localStorage.setItem('boot', '')
    timer(1000).subscribe(() => myWindow.close())
    
  }

  changeSystemColor(commands : any) {
    if (commands[0] ) {
      if (commands[0] >= 0 && commands[0] < 7) this.setPrimaryColor(commands[0])
      else this.content += 'Invalid Value'
    }
    else {
      this.content += `
        0 = MAG-Cyan<br>
        1 = MAG-Green<br>
        2 = MAG-Red<br>
        3 = MAG-Blue<br>
        4 = MAG-Purple<br>
        5 = MAG-Orange`
    }
  }

  history() {
    return `lorem ipsum dolor sit amet`
  }

  changeDesktopImage(commands : any) {
    if (commands[0] ) {
      if (commands[0] >= 0 && commands[0] < 7) this.setBackgroundImage(commands[0])
      else this.content += 'Invalid Value'
    }
    else {
      this.content += `
        0 = MAG-Cyliis<br>
        1 = CT-Acelot`
    }
  }

  help() {
    return `
      <pre>BGIMAGE    Sets desktop background image.</pre>
      <pre>CD         Displays the name of or changes the current directory.</pre>
      <pre>CLEAR      Clears the screen.</pre>
      <pre>COLOR      Sets system color.</pre>
      <pre>ECHO       Displays typed text.</pre>
      <pre>EXIT       Quits the CyCL program (command interpreter).</pre>
      <pre>FTYPE      Displays or modifies file types used in file extension associations.</pre>
      <pre>HELP       Provides Help information for CyOS commands.</pre>
      <pre>HINT       Get some help for treasure hunt.</pre>
      <pre>ICONS      Sets system icon pack.</pre>
      <pre>LOGIN      Sign in.</pre>
      <pre>LOGOUT     Sign out.</pre>
      <pre>LS         Displays a list of files and subdirectories in a directory.</pre>
      <pre>NEOFETCH   Shows system details.</pre>
      <pre>PROMOCODE  Transforms promocodes into points.</pre>
      <pre>RESOLVE    Execute quiz process</pre>
      <pre>RM         Removes a directory.</pre>
      <pre>SHUTDOWN   Shutdown of machine.</pre>
      <pre>STATE      Shows user's state.</pre>
      <pre>TIME       Displays or sets the system time.</pre>
      <pre>TITLE      Sets the window title for a CyCL session.</pre>
      <pre>VER        Displays the CyOS version.</pre>`
  }

  async neoFetch() {
    let theme = 'MAG-' + ['Cyan', 'Green', 'Red', "Blue", 'Purple', 'Orange'][parseInt(localStorage.getItem('color')!)]
    let icons = 'MAG-' + localStorage.getItem('icons')
    this.content += `
<pre>
<span class="mark">             .'cllllllllllc''                   </span><span class="dir">cyliis</span>@<span class="dir">cyliis.ro</span>
<span class="mark">          .;clllllllllllllllllc,.               OS:</span> Cyliis 2017.6.9
<span class="mark">       .:llllllllllllllllllllllllc'             Shell:</span> cycl
<span class="mark">     .cllllllllllll.  .llllllllllllc            Resolution:</span> 1920x1280
<span class="mark">     :llllllllll           .llllllllll.         Theme:</span> ${theme} [GTK2/3]
<span class="mark">   clllllllll.              llllllllll          Icons:</span> ${icons}[GTK2/3]
<span class="mark">   clllllllll.                                  CPU:</span> Intel i9-12900HX (16) @ 5.00GHz
<span class="mark"> .lllllllll:                                    GPU:</span> NVIDIA GeForce RTX 4090
<span class="mark"> clllllllll.             .......   .......      Memory:</span> 82MiB / 19043MiB
<span class="mark"> llllllllll               .......  .......      Number:</span> 19043
<span class="mark"> llllllllll                ............... </span>
<span class="mark"> llllllllll.                .............  </span>
<span class="mark"> ;lllllllll;                .............  </span>
<span class="mark">   llllllllll               .............  </span>
<span class="mark">   :llllllllll.           ,,..........     </span>
<span class="mark">     ;clllllllll:'.     .';;'.........     </span>
<span class="mark">     .;;:ccllllllllcc:;;;;,........        </span>
<span class="mark">         ;;;;;;;;;;;;;;;;;'........        </span>
<span class="mark">           ,;;;;;;;;,,'........            </span>
<span class="mark">                 ..........                </span>
    </pre>` 
    console.log((await this.userService.getCodes())[4])
  }

  setBackgroundImage(index : number) {
    [1, 2, 3, 4, 5].forEach((i) => {
      document.body.classList.remove(`background-image-${i}`)  
    })
    document.body.classList.add(`background-image-${index}`)
    localStorage.setItem(
      'bg', index.toString()
    );
  }

  setPrimaryColor(index : number) {
    [1, 2, 3, 4, 5].forEach((i) => {
      document.body.classList.remove(`primary-color-${i}`)  
    })
    document.body.classList.add(`primary-color-${index}`)
    localStorage.setItem(
      'color', index.toString()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  async mag() {
    this.content += `
<pre>
<span class="mark">
0000       0000      00000         00000000
00000     00000     000 000      000     000
000000   000000    000   000    000      
000 000 000 000    000000000    000    00000
000  00000  000   000     000    000     000
000   000   000 1 000     000 1    000000000
</span>
<b class="mark">Motricală Alin-Gabriel</b>
<span class="mark">email:</span> motricala44@gmail.com
<span class="mark">phone:</span> 0751347104
<span class="mark">github:</span> github.com/FR13ND-ly
<span class="mark">linkedin:</span> linkedin.com/in/alin-gabriel-motricala
</pre>    ` 
  }

  hint() : any {
    let user = this.userService.getUser()
    if (!user) return this.content += 'You need to login'
    if (user.resolveLevel == 7) {
      this.content += 'Base64'
    }
    else if (user.resolveLevel == 8) {
      this.content += 'Maybe .png is the wrong format?'
    }
    else if (user.resolveLevel == 9) {
      this.content += 'When you find the rabbit, password will be what you want'
    }
    else if (user.chessLevel == 0) {
      this.content += 'Chess is hiding deep inside'
    }
    else {
      this.content += 'Find adventures'
    }
  }
}