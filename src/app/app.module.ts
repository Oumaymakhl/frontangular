import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent }   from './app.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChatComponent } from './chat/chat.component';


@NgModule({
    imports:[
        BrowserAnimationsModule,HttpClientModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes,{
          useHash: true,
        }),
        NgbModule,DragDropModule,
        SidebarModule,
        NavbarModule,
        FooterModule, FixedPluginModule,ReactiveFormsModule,
        FooterModule,
        FixedPluginModule,ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        LoginComponent,
        ChatComponent,
    ], providers: [],

    bootstrap:    [ AppComponent ]
})

export class AppModule { }
