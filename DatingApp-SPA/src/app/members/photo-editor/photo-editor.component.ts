import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../_model/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
@Input() photos: Photo[];
@Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(private atuhService: AuthService,
              private userService: UserService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader()
  {
    this.uploader = new FileUploader(
    {
      url: this.baseUrl + 'users/' + this.atuhService.decodedToken.nameid + '/photos',
      authToken : 'Bearer ' + localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response){
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if(photo.isMain)
        {
          this.atuhService.changeMemberPhoto(photo.url);
          this.atuhService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.atuhService.currentUser));
        }
      }
    };
  }

  setMainPhoto(photo: Photo)
  {
    this.userService.setMainPhoto(this.atuhService.decodedToken.nameid, photo.id).subscribe(() => {
    this.currentMain = this.photos.filter(p => p.isMain === true)[0];
    this.currentMain.isMain = false;
    photo.isMain = true;
    this.atuhService.changeMemberPhoto(photo.url);
    this.atuhService.currentUser.photoUrl = photo.url;
    localStorage.setItem('user', JSON.stringify(this.atuhService.currentUser));
    }, error => {
      this.alertify.error(error);
    });
  }

  deletPhoto(id: number)
  {
    this.alertify.confirm('Are you sure you want to delete this photo ?', () => {
      this.userService.deletePhoto(this.atuhService.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('photo has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    });
  }

}
