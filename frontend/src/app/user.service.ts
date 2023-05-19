import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private userUpdated = new BehaviorSubject<any>(null)

  provider = new GoogleAuthProvider();
  private auth = getAuth()

  db = getFirestore();

  login() {
    signInWithPopup(this.auth, this.provider)
  }

  init() {
    onAuthStateChanged(this.auth, async (user : any) => {
      if (user) {
        let userInfo = await this.getRealUser(user)
        if (userInfo.uid) this.userUpdated.next(userInfo)
        else this.createUser(user) 
      }
      else this.userUpdated.next(false)
    })
    return this.auth.currentUser
  }

  getUser() {
    if (!this.userUpdated.value) return false
    return {...this.userUpdated.value}
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable()
  }

  logout() {
    signOut(this.auth)
  }

  async getRealUser(user : any) {
    let userData : any = false
    let queryData = query(collection(this.db, "users"), where("email", "==", user.email))
    let data = await getDocs(queryData)
    data.forEach((el : any) => {
      if (el.data()) {
        userData = el.data()
        userData.id = el.id
      }
    })
    return {
      username: userData.username,
      email: userData.email,
      id: userData.id,
      uid: userData.uid,
      codes: userData.codes,
      chessLevel: userData.chessLevel,
      resolveLevel: userData.resolveLevel,
    }
    
  }

  async nextChessLevel() {
    let user = this.getUser()
    await updateDoc(doc(this.db, `users/${user.id}`), {
      chessLevel : user.chessLevel + 1
    })
    user.chessLevel++
    this.userUpdated.next(user)
  }

  async nextResolveLevel() {
    let user = this.getUser()
    await updateDoc(doc(this.db, `users/${user.id}`), {
      resolveLevel : user.resolveLevel + 1
    })
    user.resolveLevel++
    this.userUpdated.next(user)
  }

  async createUser(user : any) {
    let userInfo : any = {
      username: user.displayName,
      email: user.email,
      uid: user.uid,
      codes : {},
      chessLevel: 0,
      resolveLevel: 0,
    }
    let newUser = await addDoc(collection(this.db, "users"), userInfo);
    userInfo.id = newUser.id
    this.userUpdated.next(userInfo)
  }

  async setCode(code : "any") {
    let user = this.getUser()
    user.codes[code] = true
    await updateDoc(doc(this.db, `users/${user.id}`), {codes : user.codes})
  }

  getUserState(user : any) {
    let points = 0
    points += user.chessLevel * 20
    if (user.resolveLevel < 7) {
      points += user.resolveLevel * 10
    }
    if (user.resolveLevel >= 7) {
      points += 140
      if (user.resolveLevel > 8) points += 40
      if (user.resolveLevel > 8) {
        points += (user.resolveLevel - 7) * 60
      }
    }
    Object.keys(user.codes).forEach(() => points += 30)
    return `<pre>${user.username}: <span class="mark">${points}</span> points</pre>`
  }

  async getCodes() {
    let res: any = [];
    (await getDocs(query(collection(this.db, 'codes')))).forEach((el : any) => res = el.data().codes)
    return res
  }

  async getLogs() {
    let res : any = ''
    let users = await getDocs(query(collection(this.db, `users`)))
    users.forEach((user) => {
      res += this.getUserState(user.data())
    })
    return res
  }
}
