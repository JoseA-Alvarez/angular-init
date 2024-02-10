import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, Subject, defer, exhaustMap, from } from 'rxjs';
import { catchError, filter, map, retry } from 'rxjs/operators';

import { Message } from '../interfaces/message';
import { AuthService } from './auth.service';

interface MessageState {
  messages: Message[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private authService = inject(AuthService);
  private authUser$ = toObservable(this.authService.user);

  // sources
  messages$ = this.getMessages()
  add$ = new Subject<Message['content']>();
  error$ = new Subject<string>();
  logout$ = this.authUser$.pipe(filter((user) => !user));

  // state
  private state = signal<MessageState>({
    messages: [],
    error: null,
  });

  // selectors
  messages = computed(() => this.state().messages);
  error = computed(() => this.state().error);

  constructor() {
    // reducers
    // this.messages$.pipe(takeUntilDestroyed()).subscribe((messages) =>
    //   this.state.update((state) => ({
    //     ...state,
    //     messages,
    //   }))
    // );
    //
    // this.add$
    //   .pipe(
    //     takeUntilDestroyed(),
    //     exhaustMap((message) => this.addMessage(message))
    //   )
    //   .subscribe({
    //     error: (err) => {
    //       console.log(err);
    //       this.error$.next('Failed to send message');
    //     },
    //   });
    //
    // this.logout$
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(() =>
    //     this.state.update((state) => ({ ...state, messages: [] }))
    //   );
    //
    // this.error$
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((error) =>
    //     this.state.update((state) => ({ ...state, error }))
    //   );
  }

  private getMessages() {
    // const messagesCollection = query(
    //   collection(this.firestore, 'messages'),
    //   orderBy('created', 'desc'),
    //   limit(50)
    // );
    //
    // return collectionData(messagesCollection, { idField: 'id' }).pipe(
    //   map((messages) => [...messages].reverse())
    // ) as Observable<Message[]>;
  }

  private addMessage(message: string) {
    // const newMessage = {
    //   author: this.authService.user()?.email,
    //   content: message,
    //   created: Date.now().toString(),
    // };
    //
    // const messagesCollection = collection(this.firestore, 'messages');
    // return defer(() => addDoc(messagesCollection, newMessage));
  }
}