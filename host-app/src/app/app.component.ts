import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  EnvironmentInjector,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('mfeContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  constructor(private envInjector: EnvironmentInjector) {}

  async loadRemoteComponent() {
    this.container.clear();
    // Dynamically import the remote module exposed
    const remoteModule = await import('mfe1/Component');
    const component = remoteModule.AppComponent;

    // Create the remote component
    const compRef: ComponentRef<any> = this.container.createComponent(component, {
      environmentInjector: this.envInjector,
    });
  }
}
