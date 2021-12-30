import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { HomepageComponent } from './homepage/components/homepage.component';
import { UsermenuComponent } from './usermenu/usermenu.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'login',
    component: HomepageComponent
  },
  {
    path: 'menu',
    component: UsermenuComponent
  },
  {
    path: 'create-blog',
    component: CreateBlogComponent
  },
  {
    path: 'view-blog',
    component: ViewBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomepageComponent, UsermenuComponent]
