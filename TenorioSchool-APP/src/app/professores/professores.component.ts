import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/professor';
import { ProfessorService} from './professor.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  public modalRef: BsModalRef;
  
  public title = 'Professores';

  public professorSelecionado: Professor;
  public professorForm: FormGroup;
  public textoSimples: string;

  public professores: Professor[];

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private professorService: ProfessorService) {
                this.criarForm();
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  professorSelect(professor: Professor){
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  voltar(){
    this.professorSelecionado = null;
  }
  
  ngOnInit() {
    this.carregarProfessores();
  }

  carregarProfessores() {
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
      },
      (erro: any) => {
        console.error(erro)
      }
    );
  }

  criarForm(){
    this.professorForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      disciplina: ['', Validators.required],
    });
  }

  salvarProfessor(professor: Professor){
    this.professorService.put(professor.id, professor).subscribe(
      (professor: Professor) => {
        console.log(professor);
        this.carregarProfessores();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  professorSubmit(){
    this.salvarProfessor(this.professorForm.value);
  }

}
