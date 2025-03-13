import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import Quill from 'quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TemplateRendererComponent } from './template-renderer.component';
import { PersonDataService, PersonModel } from '../person-data.service';

@Component({
  selector: 'app-template-editor',
  imports: [
    QuillModule,
    ReactiveFormsModule,
    JsonPipe,
    TemplateRendererComponent,
  ],
  templateUrl: './template-editor.component.html',
  styleUrl: './template-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PersonDataService],
})
export class TemplateEditorComponent implements OnInit {
  constructor(private service: PersonDataService) {}

  readonly editor$ = viewChild(QuillEditorComponent);

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button

      ['link', 'image', 'video'], // link and image, video
    ],
    counter: { container: '#counter', unit: 'word' },
  };

  editorForm = new FormGroup({
    editor: new FormControl('', Validators.required),
  });
  outputHtmlString: string = '';

  personData: PersonModel | undefined;

  ngOnInit(): void {
    this.personData = this.service.loadPerson(2);
    this.editorForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((x) => {
        console.log(x);
        this.outputHtmlString = x.editor || '';
      });
  }

  addFullName() {
    const editorComp = this.editor$()!;
    const quillEditor = editorComp.quillEditor!;

    const delta = quillEditor.insertEmbed(
      this.currentIndex,
      'fullname',
      '',
      Quill.sources.USER
    );

    quillEditor.setSelection(delta.length());
  }

  addDate() {
    const editorComp = this.editor$()!;
    const quillEditor = editorComp.quillEditor!;

    const delta = quillEditor.insertEmbed(
      this.currentIndex,
      'date',
      '',
      Quill.sources.USER
    );

    quillEditor.setSelection(delta.length());
  }

  private get currentIndex() {
    const quillEditor = this.editor$()?.quillEditor;
    const range = quillEditor?.getSelection();

    const index = (range?.index ?? 0) + (range?.length ?? 0);
    console.log('CURRENT INDEX', index);

    return index;
  }
}
