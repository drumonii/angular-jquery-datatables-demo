import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ServerSideData, ServerSideDataResponse } from './server-side-data';

@Injectable()
export class ServerSideMockDataInterceptor implements HttpInterceptor {

  networkDelay = 2000;

  data: ServerSideData[] = [
    {
      DT_RowId: '1',
      name: 'Tiger Nixon',
      position: 'System Architect',
      salary: '$320,800',
      start_date: '2011/04/25',
      office: 'Edinburgh',
      extn: '5421'
    },
    {
      DT_RowId: '2',
      name: 'Garrett Winters',
      position: 'Accountant',
      salary: '$170,750',
      start_date: '2011/07/25',
      office: 'Tokyo',
      extn: '8422'
    },
    {
      DT_RowId: '3',
      name: 'Ashton Cox',
      position: 'Junior Technical Author',
      salary: '$86,000',
      start_date: '2009/01/12',
      office: 'San Francisco',
      extn: '1562'
    },
    {
      DT_RowId: '4',
      name: 'Cedric Kelly',
      position: 'Senior Javascript Developer',
      salary: '$433,060',
      start_date: '2012/03/29',
      office: 'Edinburgh',
      extn: '6224'
    },
    {
      DT_RowId: '5',
      name: 'Airi Satou',
      position: 'Accountant',
      salary: '$162,700',
      start_date: '2008/11/28',
      office: 'Tokyo',
      extn: '5407'
    },
    {
      DT_RowId: '6',
      name: 'Brielle Williamson',
      position: 'Integration Specialist',
      salary: '$372,000',
      start_date: '2012/12/02',
      office: 'New York',
      extn: '4804'
    },
    {
      DT_RowId: '7',
      name: 'Herrod Chandler',
      position: 'Sales Assistant',
      salary: '$137,500',
      start_date: '2012/08/06',
      office: 'San Francisco',
      extn: '9608'
    },
    {
      DT_RowId: '8',
      name: 'Rhona Davidson',
      position: 'Integration Specialist',
      salary: '$327,900',
      start_date: '2010/10/14',
      office: 'Tokyo',
      extn: '6200'
    },
    {
      DT_RowId: '9',
      name: 'Colleen Hurst',
      position: 'Javascript Developer',
      salary: '$205,500',
      start_date: '2009/09/15',
      office: 'San Francisco',
      extn: '2360'
    },
    {
      DT_RowId: '10',
      name: 'Sonya Frost',
      position: 'Software Engineer',
      salary: '$103,600',
      start_date: '2008/12/13',
      office: 'Edinburgh',
      extn: '1667'
    },
    {
      DT_RowId: '11',
      name: 'Jena Gaines',
      position: 'Office Manager',
      salary: '$90,560',
      start_date: '2008/12/19',
      office: 'London',
      extn: '3814'
    },
    {
      DT_RowId: '12',
      name: 'Quinn Flynn',
      position: 'Support Lead',
      salary: '$342,000',
      start_date: '2013/03/03',
      office: 'Edinburgh',
      extn: '9497'
    },
    {
      DT_RowId: '13',
      name: 'Charde Marshall',
      position: 'Regional Director',
      salary: '$470,600',
      start_date: '2008/10/16',
      office: 'San Francisco',
      extn: '6741'
    },
    {
      DT_RowId: '14',
      name: 'Haley Kennedy',
      position: 'Senior Marketing Designer',
      salary: '$313,500',
      start_date: '2012/12/18',
      office: 'London',
      extn: '3597'
    },
    {
      DT_RowId: '15',
      name: 'Tatyana Fitzpatrick',
      position: 'Regional Director',
      salary: '$385,750',
      start_date: '2010/03/17',
      office: 'London',
      extn: '1965'
    },
    {
      DT_RowId: '16',
      name: 'Michael Silva',
      position: 'Marketing Designer',
      salary: '$198,500',
      start_date: '2012/11/27',
      office: 'London',
      extn: '1581'
    },
    {
      DT_RowId: '17',
      name: 'Paul Byrd',
      position: 'Chief Financial Officer (CFO)',
      salary: '$725,000',
      start_date: '2010/06/09',
      office: 'New York',
      extn: '3059'
    },
    {
      DT_RowId: '18',
      name: 'Gloria Little',
      position: 'Systems Administrator',
      salary: '$237,500',
      start_date: '2009/04/10',
      office: 'New York',
      extn: '1721'
    },
    {
      DT_RowId: '19',
      name: 'Bradley Greer',
      position: 'Software Engineer',
      salary: '$132,000',
      start_date: '2012/10/13',
      office: 'London',
      extn: '2558'
    },
    {
      DT_RowId: '20',
      name: 'Dai Rios',
      position: 'Personnel Lead',
      salary: '$217,500',
      start_date: '2012/09/26',
      office: 'Edinburgh',
      extn: '2290'
    },
    {
      DT_RowId: '21',
      name: 'Jenette Caldwell',
      position: 'Development Lead',
      salary: '$345,000',
      start_date: '2011/09/03',
      office: 'New York',
      extn: '1937'
    },
    {
      DT_RowId: '22',
      name: 'Yuri Berry',
      position: 'Chief Marketing Officer (CMO)',
      salary: '$675,000',
      start_date: '2009/06/25',
      office: 'New York',
      extn: '6154'
    },
    {
      DT_RowId: '23',
      name: 'Caesar Vance',
      position: 'Pre-Sales Support',
      salary: '$106,450',
      start_date: '2011/12/12',
      office: 'New York',
      extn: '8330'
    },
    {
      DT_RowId: '24',
      name: 'Doris Wilder',
      position: 'Sales Assistant',
      salary: '$85,600',
      start_date: '2010/09/20',
      office: 'Sydney',
      extn: '3023'
    },
    {
      DT_RowId: '25',
      name: 'Angelica Ramos',
      position: 'Chief Executive Officer (CEO)',
      salary: '$1,200,000',
      start_date: '2009/10/09',
      office: 'London',
      extn: '5797'
    },
    {
      DT_RowId: '26',
      name: 'Gavin Joyce',
      position: 'Developer',
      salary: '$92,575',
      start_date: '2010/12/22',
      office: 'Edinburgh',
      extn: '8822'
    },
    {
      DT_RowId: '27',
      name: 'Jennifer Chang',
      position: 'Regional Director',
      salary: '$357,650',
      start_date: '2010/11/14',
      office: 'Singapore',
      extn: '9239'
    },
    {
      DT_RowId: '28',
      name: 'Brenden Wagner',
      position: 'Software Engineer',
      salary: '$206,850',
      start_date: '2011/06/07',
      office: 'San Francisco',
      extn: '1314'
    },
    {
      DT_RowId: '29',
      name: 'Fiona Green',
      position: 'Chief Operating Officer (COO)',
      salary: '$850,000',
      start_date: '2010/03/11',
      office: 'San Francisco',
      extn: '2947'
    },
    {
      DT_RowId: '30',
      name: 'Shou Itou',
      position: 'Regional Marketing',
      salary: '$163,000',
      start_date: '2011/08/14',
      office: 'Tokyo',
      extn: '8899'
    },
    {
      DT_RowId: '31',
      name: 'Michelle House',
      position: 'Integration Specialist',
      salary: '$95,400',
      start_date: '2011/06/02',
      office: 'Sydney',
      extn: '2769'
    },
    {
      DT_RowId: '32',
      name: 'Suki Burks',
      position: 'Developer',
      salary: '$114,500',
      start_date: '2009/10/22',
      office: 'London',
      extn: '6832'
    },
    {
      DT_RowId: '33',
      name: 'Prescott Bartlett',
      position: 'Technical Author',
      salary: '$145,000',
      start_date: '2011/05/07',
      office: 'London',
      extn: '3606'
    },
    {
      DT_RowId: '34',
      name: 'Gavin Cortez',
      position: 'Team Leader',
      salary: '$235,500',
      start_date: '2008/10/26',
      office: 'San Francisco',
      extn: '2860'
    },
    {
      DT_RowId: '35',
      name: 'Martena Mccray',
      position: 'Post-Sales support',
      salary: '$324,050',
      start_date: '2011/03/09',
      office: 'Edinburgh',
      extn: '8240'
    },
    {
      DT_RowId: '36',
      name: 'Unity Butler',
      position: 'Marketing Designer',
      salary: '$85,675',
      start_date: '2009/12/09',
      office: 'San Francisco',
      extn: '5384'
    },
    {
      DT_RowId: '37',
      name: 'Howard Hatfield',
      position: 'Office Manager',
      salary: '$164,500',
      start_date: '2008/12/16',
      office: 'San Francisco',
      extn: '7031'
    },
    {
      DT_RowId: '38',
      name: 'Hope Fuentes',
      position: 'Secretary',
      salary: '$109,850',
      start_date: '2010/02/12',
      office: 'San Francisco',
      extn: '6318'
    },
    {
      DT_RowId: '39',
      name: 'Vivian Harrell',
      position: 'Financial Controller',
      salary: '$452,500',
      start_date: '2009/02/14',
      office: 'San Francisco',
      extn: '9422'
    },
    {
      DT_RowId: '40',
      name: 'Timothy Mooney',
      position: 'Office Manager',
      salary: '$136,200',
      start_date: '2008/12/11',
      office: 'London',
      extn: '7580'
    },
    {
      DT_RowId: '41',
      name: 'Jackson Bradshaw',
      position: 'Director',
      salary: '$645,750',
      start_date: '2008/09/26',
      office: 'New York',
      extn: '1042'
    },
    {
      DT_RowId: '42',
      name: 'Olivia Liang',
      position: 'Support Engineer',
      salary: '$234,500',
      start_date: '2011/02/03',
      office: 'Singapore',
      extn: '2120'
    },
    {
      DT_RowId: '43',
      name: 'Bruno Nash',
      position: 'Software Engineer',
      salary: '$163,500',
      start_date: '2011/05/03',
      office: 'London',
      extn: '6222'
    },
    {
      DT_RowId: '44',
      name: 'Sakura Yamamoto',
      position: 'Support Engineer',
      salary: '$139,575',
      start_date: '2009/08/19',
      office: 'Tokyo',
      extn: '9383'
    },
    {
      DT_RowId: '45',
      name: 'Thor Walton',
      position: 'Developer',
      salary: '$98,540',
      start_date: '2013/08/11',
      office: 'New York',
      extn: '8327'
    },
    {
      DT_RowId: '46',
      name: 'Finn Camacho',
      position: 'Support Engineer',
      salary: '$87,500',
      start_date: '2009/07/07',
      office: 'San Francisco',
      extn: '2927'
    },
    {
      DT_RowId: '47',
      name: 'Serge Baldwin',
      position: 'Data Coordinator',
      salary: '$138,575',
      start_date: '2012/04/09',
      office: 'Singapore',
      extn: '8352'
    },
    {
      DT_RowId: '48',
      name: 'Zenaida Frank',
      position: 'Software Engineer',
      salary: '$125,250',
      start_date: '2010/01/04',
      office: 'New York',
      extn: '7439'
    },
    {
      DT_RowId: '49',
      name: 'Zorita Serrano',
      position: 'Software Engineer',
      salary: '$115,000',
      start_date: '2012/06/01',
      office: 'San Francisco',
      extn: '4389'
    },
    {
      DT_RowId: '50',
      name: 'Jennifer Acosta',
      position: 'Junior Javascript Developer',
      salary: '$75,650',
      start_date: '2013/02/01',
      office: 'Edinburgh',
      extn: '3431'
    },
    {
      DT_RowId: '51',
      name: 'Cara Stevens',
      position: 'Sales Assistant',
      salary: '$145,600',
      start_date: '2011/12/06',
      office: 'New York',
      extn: '3990'
    },
    {
      DT_RowId: '52',
      name: 'Hermione Butler',
      position: 'Regional Director',
      salary: '$356,250',
      start_date: '2011/03/21',
      office: 'London',
      extn: '1016'
    },
    {
      DT_RowId: '53',
      name: 'Lael Greer',
      position: 'Systems Administrator',
      salary: '$103,500',
      start_date: '2009/02/27',
      office: 'London',
      extn: '6733'
    },
    {
      DT_RowId: '54',
      name: 'Jonas Alexander',
      position: 'Developer',
      salary: '$86,500',
      start_date: '2010/07/14',
      office: 'San Francisco',
      extn: '8196'
    },
    {
      DT_RowId: '55',
      name: 'Shad Decker',
      position: 'Regional Director',
      salary: '$183,000',
      start_date: '2008/11/13',
      office: 'Edinburgh',
      extn: '6373'
    },
    {
      DT_RowId: '56',
      name: 'Michael Bruce',
      position: 'Javascript Developer',
      salary: '$183,000',
      start_date: '2011/06/27',
      office: 'Singapore',
      extn: '5384'
    },
    {
      DT_RowId: '57',
      name: 'Donna Snider',
      position: 'Customer Support',
      salary: '$112,000',
      start_date: '2011/01/25',
      office: 'New York',
      extn: '4226'
    }
  ];

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url !== '/server-side-data') {
      return next.handle(request);
    }

    const params = request.params;

    const page = +(params.get('page') || 0);
    const pageSize = +(params.get('size') || 10);
    const sorts = (params.getAll('sort') || []).map((sort) => {
      const sortDetails = sort.split(',');
      return {
        prop: sortDetails[0],
        direction: sortDetails[1] || 'asc'
      };
    });
    const search = (params.get('search') || '').toLowerCase();

    const processedDate = this.data
      .filter((data) => {
        return ~data.name.toLowerCase().indexOf(search) || ~data.position.toLowerCase().indexOf(search) ||
          ~data.salary.indexOf(search) || ~data.start_date.indexOf(search) ||
          ~data.office.toLowerCase().indexOf(search) || ~data.extn.indexOf(search);
      })
      .sort((data1, data2) => {
        let result = 0;
        let i = 0;
        while (result === 0 && i < sorts.length) {
          const sort = sorts[i];
          const value1 = data1[sort.prop];
          const value2 = data2[sort.prop];
          result = this.compare(value1, value2, sort.direction);
          i++;
        }
        return result;
      });

    const pagedData = [];

    const totalPages = Math.ceil(processedDate.length / pageSize);
    let startPage = 0;
    let endPage = pageSize;
    for (let i = 0; i < totalPages; i++) {
      pagedData[i] = processedDate.slice(startPage, endPage);
      startPage += pageSize;
      endPage += pageSize;
    }

    return of(new HttpResponse<ServerSideDataResponse>({
      status: 200,
      body: {
        totalElements: pagedData.reduce((count, paged) => count + paged.length, 0),
        totalPages: pagedData.length,
        page,
        pageSize,
        content: page >= totalPages ? [] : pagedData[page]
      }
    })).pipe(delay(this.networkDelay));
  }

  private compare(val1, val2, direction): number {
    if (direction === 'asc') {
      return this.sortAsc(val1, val2);
    }
    return this.sortDesc(val1, val2);
  }

  private sortAsc(value1, value2): number {
    return value1 === value2 ? 0 : value1 > value2 ? 1 : -1;
  }

  private sortDesc(val1, val2): number {
    return val1 === val2 ? 0 : val1 < val2 ? 1 : -1;
  }

}
