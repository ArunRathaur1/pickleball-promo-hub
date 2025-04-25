with Ada.Text_IO;use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;
procedure Producer_Consumer_System is
   protected type Bounded_Buffer(Max : Positive) is
        entry Insert(Item : Integer);       
        entry Remove(Item : out Integer);      
      Buffer : array(1 .. Max) of Integer;   
      Head, Tail, Count : Natural := 0;   
   end Bounded_Buffer;
   protected body Bounded_Buffer is
      entry Insert(Item : Integer) when Count < Max is
      begin
         Tail := (Tail mod Max) + 1;        
         Buffer(Tail) := Item;            
         Count := Count + 1;            
      end Insert;
      entry Remove(Item : out Integer) when Count > 0 is
      begin
         Head := (Head mod Max) + 1;      
         Item := Buffer(Head);              
         Count := Count - 1;             
      end Remove;
   end Bounded_Buffer;

   Buffer : Bounded_Buffer(5);
   task Producer;
   task body Producer is
   begin
      for I in 1 .. 10 loop                   
         Buffer.Insert(I);               
         Put_Line("Produced: " & Integer'Image(I)); 
      end loop;
   end Producer;

   task Consumer;

   task body Consumer is
      Value : Integer;                     
   begin
      for I in 1 .. 10 loop                    
         Buffer.Remove(Value);               
         Put_Line("Consumed: " & Integer'Image(Value));
      end loop;
   end Consumer;

begin
   null;
end Producer_Consumer_System;
