import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;


  //Inject member service so we can get user details
  //We also need to get the username from route
  //We do this by injecting activated route
  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    //We access the username passed in route. Over here
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
    })
  }


  getImages() {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      //Push pics into Image Url array
      imageUrls.push({
        mainpicture: photo?.url//User might not have a photo
      });
    }
    return imageUrls;
  }
}
