import { Migration } from '@mikro-orm/migrations';

export class Migration20260127183400 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`subscriptions\` (\`id\` int unsigned not null auto_increment primary key, \`email\` varchar(255) not null, \`confirmation_code\` varchar(36) not null, \`confirmed\` tinyint(1) not null default false, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`subscriptions\` add unique \`subscriptions_email_unique\`(\`email\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`subscriptions\`;`);
  }

}
