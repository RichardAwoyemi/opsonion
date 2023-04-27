import { inject, TestBed } from '@angular/core/testing';
import { BlacklistService } from './blacklist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BlacklistService unit tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlacklistService],
    });
  });

  describe('checkAgainstBlacklist()', () => {
    it('should return false if blacklisted term is in a subset of a word', inject(
      [BlacklistService],
      () => {
        const blacklistTerms = ['scat', 'spic'];
        expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, 'scattered')).toEqual(false);
        expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, 'oversuspicious')).toEqual(
          false
        );
      }
    ));
  });

  it('should return true if sentence contains blacklisted term', inject([BlacklistService], () => {
    const blacklistTerms = [
      'scat',
      'spic',
      'forbanna',
      'olla',
      'satan',
      'götverenlerden',
      '你它马的',
      '幼児性愛者',
    ];
    expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, 'scat')).toEqual(true);
    expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, 'scat-website')).toEqual(true);
    expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, 'spic')).toEqual(true);
    expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, 'website-spic')).toEqual(true);
    expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, 'forbanna')).toEqual(true);
    expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, 'olla')).toEqual(true);
    expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, 'satan-website')).toEqual(true);
    expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, 'götverenlerden')).toEqual(true);
    expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, '你它马的')).toEqual(true);
    expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, '幼児性愛者')).toEqual(true);
  }));

  it('should return true when blacklisted term consists of multiple words', inject(
    [BlacklistService],
    () => {
      const blacklistTerms = ['scat spic'];
      expect(BlacklistService.checkAgainstBlacklist(blacklistTerms, 'scat spic')).toEqual(true);
    }
  ));
});
