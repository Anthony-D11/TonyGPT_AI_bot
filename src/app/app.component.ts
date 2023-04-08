import { Component } from '@angular/core';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import { config } from 'dotenv';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public botResponse: string = "Bot response goes HERE";
  public promptText: string = "";
  
  constructor() {}


  
  title = 'TonyGPT_AI_bot';

  async sendMessage() {
    try {
      let configuration = new Configuration({
        //apiKey: process.env['OPENAI_API_KEY'],
        apiKey: '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'
      });
      let openai = new OpenAIApi(configuration);

      let requestData: CreateCompletionRequest = {
        model: 'text-davinci-003',
        prompt: this.promptText,
        temperature: 0.95,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }


      let response = await openai.createCompletion(requestData);

      this.botResponse = response.data.choices[0].text!;
    }catch(error:any) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        
      }
    }
    
  }
}
