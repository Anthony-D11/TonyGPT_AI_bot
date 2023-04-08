import { Component } from '@angular/core';
import { Configuration, OpenAIApi, CreateCompletionRequest, CreateChatCompletionRequest, ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { config } from 'dotenv';
import { message } from './ultility';
import { GPT_response_format } from './ultility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public promptText: string = "";
  public showTyping: boolean = false;
  public messageList: message[] = [];
  private promptTextList: ChatCompletionRequestMessage[] = [];
  constructor() {
    this.pushChat("Chào bạn, mình là TonyGPT. \nMình có thể giúp gì cho bạn hôm nay nhỉ?", true, "bot")
  }
  
  title = 'TonyGPT_AI_bot';

  pushChat(content: string, bot_response: boolean, cssClass: string) {
    let singleChat: message = {
      bot_response: bot_response,
      content: content,
      cssClass: cssClass
    };
    this.messageList.push(singleChat);

    let sender: ChatCompletionRequestMessageRoleEnum = 'user';
    if(bot_response) {
      sender = 'assistant'
    }

    let singleResponse: ChatCompletionRequestMessage = {
      role: sender,
      content: content
    }
    this.promptTextList.push(singleResponse);
  }

  async sendMessage() {
    try {
      const userInputTextArea = document.getElementById('user_input_text') as HTMLTextAreaElement;
      userInputTextArea.value = ''

      this.pushChat(this.promptText, false, 'user');
      let configuration = new Configuration({
        //apiKey: process.env['OPENAI_API_KEY'],
        apiKey: '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'
      });
      let openai = new OpenAIApi(configuration);
      

      let requestData: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo', 
        messages: this.promptTextList,
        temperature: 0.7,
        max_tokens: 2500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }
      this.showTyping = true;
      let response = await openai.createChatCompletion(requestData);
      let botResponse = response.data.choices[0].message?.content;
      this.pushChat(botResponse!, true, 'bot');
      this.showTyping = false;

    }catch(error:any) {
      this.showTyping = false;
      if (error.response) {
        console.error(error.response.status, error.response.data);
        
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        
      }
    }
    
  }
}
