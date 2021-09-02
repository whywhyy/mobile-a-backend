import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RankService } from './rank.service';
import { ParseIntPipe } from '@nestjs/common';
import { ProfileRank, RankChangedStatus } from './rank-profileRank.dto';
import { SchoolProfileRank } from './rank-schoolProfileRank.dto';
import { ProfileRankWithCompareField } from './rank-profileRankWithConpareField.dto';
@ApiTags('Rank')
@Controller('/ranks')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  // // ranks
  // @Get('')
  // @ApiOperation({
  //   summary: '전체 랭킹 조회',
  //   description: '전채 랭킹 조회를 진행합니다.',
  // })
  // @ApiOkResponse({ description: '전체 랭킹 조회 성공' })
  // @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
  // @ApiBody({ type: String })
  // getRank(): string {
  //   return 'get all ranking';
  // }

  //
  @Get('/regions/:id')
  @ApiOperation({
    summary: 'mock 지역 내 학교 랭킹 목록 조회',
    description: '지역 내 학교 랭킹 목록을 조회합니다.',
  })
  @ApiOkResponse({
    description: '지역 내 학교 랭킹 목록을 조회합니다.',
    type: SchoolProfileRank,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
  async getSchoolProfileRanksByRegionId(
    @Param('id', ParseIntPipe) regionlId: number,
  ): Promise<SchoolProfileRank[]> {
    return [
      {
        rankNo: 10,
        rankChangedStatus: RankChangedStatus.NEW,
        point: 123421,
        id: 1234,
        name: '서울 고등학교',
        division: '고등학교',
        region: '서울',
        address: '서울시 동대문구 동대문동 동대문로 123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rankNo: 10,
        rankChangedStatus: RankChangedStatus.NEW,
        point: 123421,
        id: 1234,
        name: '서울 고등학교',
        division: '고등학교',
        region: '서울',
        address: '서울시 동대문구 동대문동 동대문로 123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rankNo: 10,
        rankChangedStatus: RankChangedStatus.NEW,
        point: 123421,
        id: 1234,
        name: '서울 고등학교',
        division: '고등학교',
        region: '서울',
        address: '서울시 동대문구 동대문동 동대문로 123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  @Get('/regions/:regionId/schools/:schoolId')
  @ApiOperation({
    summary: 'mock 지역 내 학교 랭킹 조회',
    description: '지역 내 학교 랭킹 조회를 진행합니다.',
  })
  @ApiOkResponse({
    description: '지역 내 학교 랭킹 조회를 진행합니다.',
    type: SchoolProfileRank,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
  async getSchoolProfileRanksByRegionIdAndSchoolId(
    @Param('regionId', ParseIntPipe) regionlId: number,
    @Param('schoolId') schoolId: string,
  ): Promise<SchoolProfileRank> {
    return {
      rankNo: 10,
      rankChangedStatus: RankChangedStatus.NEW,
      point: 123421,
      id: 1234,
      name: '서울 고등학교',
      division: '고등학교',
      region: '서울',
      address: '서울시 동대문구 동대문동 동대문로 123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // ranks/schools/:id
  @Get('/schools/:id')
  @ApiOperation({
    summary: '학교 내 개인별 랭킹 조회',
    description: '학교 내 개인별 랭킹 조회를 진행합니다.',
  })
  @ApiOkResponse({
    description: '학교 내에서의 개인별 랭킹 조회 성공',
    type: ProfileRank,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
  async getProfileRanksByScoolId(
    @Param('id') schoolId: string,
  ): Promise<ProfileRank[]> {
    return await this.rankService.getProfileRanksByScoolId(schoolId);
  }

  // // ranks/schools/:schoolId/users/:userId
  @Get('/schools/:schoolId/users/:userId')
  @ApiOperation({
    summary: '학교 내 개인 랭킹 조회',
    description: '학교 내 개인 랭킹 조회를 진행합니다.',
  })
  @ApiOkResponse({
    description: '학교 내에서의 개인 랭킹 조회 성공',
    type: ProfileRank,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
  async getProfilesRankByScoolIdAndUserId(
    @Param('schoolId') schoolId: string,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ProfileRank> {
    return await this.rankService.getProfileRankByScoolIdAndUserId(
      schoolId,
      userId,
    );
  }

  @Get('/champions/:championId/compareFields/:compareFieldId/schools/:schoolId')
  @ApiOperation({
    summary: 'mock 학교내 챔피언 실력 비교',
    description: '학교내 챔피언 실력 비교를 진행합니다.',
  })
  @ApiOkResponse({
    description: '학교내 챔피언 실력 비교 조회 성공',
    type: ProfileRankWithCompareField,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
  async getProfilesRankWithCompareFieldByParams(
    @Param('championId', ParseIntPipe) championId: number,
    @Param('compareFieldId', ParseIntPipe) compareFieldId: number,
    @Param('schoolId') schoolId: string,
  ): Promise<ProfileRankWithCompareField[]> {
    return [];
  }

  // // ranks/regions/:id
  // @Get('/regions/:id')
  // @ApiOperation({
  //   summary: '지역 내 카테고리별 랭킹 조회',
  //   description: '지역 내 카테고리별 랭킹 조회를 진행합니다.',
  // })
  // @ApiOkResponse({ description: '지역 내에서의 특정 카테고리 랭킹 조회 성공' })
  // @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
  // getRegionRank(@Param('id') category: number) {
  //   return 'get category ranking of region';
  // }
}
