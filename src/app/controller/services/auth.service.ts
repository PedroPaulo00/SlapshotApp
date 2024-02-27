import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  signUpWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  getUserProfile(): Observable<any> {
    return this.fireAuth.authState;
  }
  
  signIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  async getCurrentUserId(): Promise<string | null> {
    const user = await this.fireAuth.currentUser;
    return user ? user.uid : null;
  }  
  
  async signOut() {
    try {
      await this.fireAuth.signOut();
    } catch (error) {
      throw new Error('Erro ao desconectar o usuário: ' + error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await this.fireAuth.sendPasswordResetEmail(email);
    } catch (error) {
      throw new Error('Erro ao enviar email de redefinição de senha: ' + error);
    }
  }
}
