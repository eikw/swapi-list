import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  model,
  resource,
  signal,
  viewChild,
  effect,
} from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { PeopleService } from '../people.service';
import { FormsModule } from '@angular/forms';
import { IPeople } from '@eik/shared';

interface ISearchCriteria {
  value: string;
  page: number;
}

@Component({
  selector: 'app-list',
  imports: [ListItemComponent, ListHeaderComponent, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  list = viewChild.required<HTMLDivElement>('list');
  currentlyLoaded: IPeople[] = [];
  lastPage = 1;

  onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      !this.loading() &&
      this.hasNext() &&
      this.currentPage() < this.pageCount()
    ) {
      this.currentPage.update((value) => value + 1);
      this.criteria.set({
        value: this.searchterm(),
        page: this.currentPage(),
      });
    }
  }

  peopleService = inject(PeopleService);

  lastSearchTerm = signal<string>('');
  searchterm = model<string>('');
  currentPage = signal<number>(1);

  criteria = signal<ISearchCriteria>({
    value: this.searchterm(),
    page: this.currentPage(),
  });

  peopleResource = resource({
    request: this.criteria,
    loader: async (param) => {
      console.log(
        `load page ${param.request.page} for value "${param.request.value}"`
      );
      return this.peopleService.getPeoplePromise(
        param.request.page,
        param.request.value
      );
    },
  });

  people = computed(() => {
    if (this.currentlyLoaded.length === 0) {
      this.currentlyLoaded = this.peopleResource.value()?.results ?? [];
    } else {
      this.currentlyLoaded = [
        ...this.currentlyLoaded,
        ...(this.peopleResource.value()?.results ?? []),
      ];
    }
    return this.currentlyLoaded;
  });
  total = computed(() => this.peopleResource.value()?.total ?? 0);
  hasNext = computed(() => this.peopleResource.value()?.next !== null);
  hasPrevious = computed(() => this.peopleResource.value()?.previous !== null);
  pageCount = computed(() => this.peopleResource.value()?.pageCount ?? 0);

  loading = this.peopleResource.isLoading;
  error = this.peopleResource.error;

  search() {
    if (this.searchterm() != this.lastSearchTerm()) {
      this.currentPage.set(1);
      this.lastPage = 1;
      this.currentlyLoaded = [];
      this.lastSearchTerm.set(this.searchterm());

      this.criteria.set({
        value: this.searchterm(),
        page: this.currentPage(),
      });
    }
  }
}
