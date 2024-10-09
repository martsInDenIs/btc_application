import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiResponse } from '../coins-rate.types';

@Injectable()
export class CoinGeekoService {
  private readonly url = 'https:///api.coingecko.com/api/v3/simple/price';

  constructor(private readonly httpService: HttpService) {}

  async fetchRate(coin: string, currency: string) {
    const { data } = await this.httpService.axiosRef.get<ApiResponse>(
      `${this.url}?ids=${coin}&vs_currencies=${currency}`,
    );

    return data[coin][currency];
  }
}
