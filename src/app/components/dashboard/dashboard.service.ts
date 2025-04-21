import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';
import { environment } from '../../../environments/environment';
@Injectable()
export class DashboardService {
    baseUrl = environment.serviceApiUrl;

    constructor(private httpClient: HttpClient, private commonService: CommonService) { }

    public getMainData() {
        return this.httpClient.get("assets/data/project-related/main-table.json", this.commonService.jwt());
    }

    public getDetailedData(criteria?: any) {
        let params = new HttpParams();
    
        if (criteria) {
            Object.keys(criteria).forEach(key => {
                if (criteria[key] !== null && criteria[key] !== undefined) {
                    params = params.append(key, criteria[key]);
                }
            });
        }
    
        return this.httpClient.get(this.baseUrl + "/emsa/custom", { 
            params, 
            headers: this.commonService.jwt().headers  // Ensure headers are included
        });
    }

    public fetchDashboardMetric(){
        return this.httpClient.get(this.baseUrl + "/emsa/metric-query", this.commonService.jwt());
    }

    public postActions(body) {
        return this.httpClient.post(this.baseUrl + "/emsa/status-update", body, this.commonService.jwt());
    }

    public getPatientDetail(mrn?: string){
        return this.httpClient.get(this.baseUrl + "/emsa/"+mrn, this.commonService.jwt());
    }
}