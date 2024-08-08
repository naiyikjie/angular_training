import { Component, Input, OnChanges, OnInit, ViewEncapsulation, SimpleChanges, ViewChild, ElementRef, ContentChild} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit, OnChanges{
  @Input() element!: {type: string, name: string, content: string};
  @ViewChild('heading', {static: true}) header!: ElementRef;
  @ContentChild('contentParagraph', {static:true}) paragraph!: ElementRef;
    constructor(){

    }

    ngOnChanges(changes: SimpleChanges){
      console.log('ngOnChanges called');
      
    }

    ngOnInit() {
        console.log('ngOnInit called');
        console.log(this.header.nativeElement.textContent);
        
        
    }
}





