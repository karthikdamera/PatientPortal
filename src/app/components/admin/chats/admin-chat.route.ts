
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatsComponent } from './chats.component';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
const routes: Routes = [
  {
    path: '',
    component: ChatsComponent
  },
  {
    path: 'ChatLayout',
    component: ChatLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminChatRoutingModule { }
