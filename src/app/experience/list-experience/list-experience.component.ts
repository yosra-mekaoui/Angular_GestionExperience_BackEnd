import { Component, OnInit,ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Experience } from 'src/app/Models/Experience';
import { DialogExperienceComponent } from '../dialog-experience/dialog-experience.component';

import { ServiceExperienceService } from 'src/app/service-experience.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-list-experience',
  templateUrl: './list-experience.component.html',
  styleUrls: ['./list-experience.component.css']
})
export class ListExperienceComponent implements OnInit {
  displayedColumns: string[] = ['idExperience','type','titreDuProfil','dateDebutExperience','dateFinExperience','descriptif','lieu','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    private experienceService:ServiceExperienceService) {}

openDialog() {
this.dialog.open(DialogExperienceComponent, {
width:'30%'

}).afterClosed().subscribe(val=>{
if(val==='ajout'){
this.getAllExperiences()
}
});
}

ngOnInit(): void {
this.getAllExperiences()

}






getAllExperiences(){
this.experienceService.getExperience()
.subscribe({
next: (res)=>{
console.log(res);
this.dataSource=new MatTableDataSource(res)
console.log("heeeelooo");

this.dataSource.paginator=this.paginator
this.dataSource.sort=this.sort

},
error:()=>{
alert("erreur get all")
}


})



}


applyFilter(event: Event) {
const filterValue = (event.target as HTMLInputElement).value;
this.dataSource.filter = filterValue.trim().toLowerCase();

if (this.dataSource.paginator) {
this.dataSource.paginator.firstPage();
}
}



editExperience(row :any) {
this.dialog.open(DialogExperienceComponent, {
width:'30%',
data:row

}).afterClosed().subscribe(val=>{
if(val==='update'){
this.getAllExperiences()
}
});;
}





/*deleteExperience(id:number){

this.experienceService.deleteExperience(id)
.subscribe({
    next: (res)=>{
alert("experience bien supprimer")
this.getAllExperiences()

},
error:()=>{
alert("erreur de suppression")
}


})

}*/

deleteExperience(id: number){
  this.experienceService.deleteExperience(id).subscribe( data => {
    alert("experience bien supprimer")

    this.getAllExperiences()
 

})
}





}
