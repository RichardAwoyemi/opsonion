import { UtilService } from './util.service';
import { inject, TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { NGXLogger } from 'ngx-logger';

describe('UtilService unit tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoggerTestingModule],
      providers: [UtilService, NGXLogger],
    });
  });

  describe('toTitleCase()', () => {
    it('should return name in title case', inject([UtilService], () => {
      let name = 'priscilla';
      let formattedName = UtilService.toTitleCase(name);
      expect(formattedName).toEqual('Priscilla');

      name = 'JOHN';
      formattedName = UtilService.toTitleCase(name);
      expect(formattedName).toEqual('John');

      name = 'SaM    ';
      formattedName = UtilService.toTitleCase(name);
      expect(formattedName).toEqual('Sam');

      name = '    RiChArD    ';
      formattedName = UtilService.toTitleCase(name);
      expect(formattedName).toEqual('Richard');
    }));
  });

  describe('generateRandomString()', () => {
    it('should return a random string', inject([UtilService], () => {
      const random = UtilService.generateRandomString(8);
      expect(random.length).toEqual(8);
    }));
  });

  describe('createYearRange()', () => {
    it('should return a range of years', inject([UtilService], () => {
      const years = UtilService.createYearRange('2000', '2019');
      expect(years.length).toEqual(20);
      expect(years[0]).toEqual(2000);
      expect(years[10]).toEqual(2010);
      expect(years[19]).toEqual(2019);
    }));
  });
});
